// lib/subbot.js
const fs = require("fs");
const path = require("path");
const qrcode = require("qrcode-terminal");
const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys");
const pino = require("pino");
const readline = require("readline");
const { exec } = require("child_process");

const subBots = new Map(); // Guarda sub-bots activos

async function startSubBot(mainClient, m, usePairing = false) {
  const userId = m.sender;

  if (subBots.has(userId)) {
    return mainClient.sendMessage(m.chat, { text: "⚠️ Ya tienes un sub-bot activo." }, { quoted: m });
  }

  const sessionDir = path.join(__dirname, "../star_session", userId);
  if (!fs.existsSync(sessionDir)) fs.mkdirSync(sessionDir, { recursive: true });

  const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
  const { version } = await fetchLatestBaileysVersion();

  const subClient = makeWASocket({
    version,
    logger: pino({ level: "silent" }),
    printQRInTerminal: !usePairing,
    auth: state,
    browser: ["Starlights-SubBot", "Safari", "1.0.0"],
  });

  subBots.set(userId, subClient);

  if (usePairing && !subClient.authState.creds.registered) {
    // Si se quiere usar pairing code
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const phoneNumber = await new Promise((resolve) => rl.question("Ingrese su número de WhatsApp para el sub-bot:\n", resolve));
    rl.close();
    try {
      const pairing = await subClient.requestPairingCode(phoneNumber, "S1T2A3R4");
      mainClient.sendMessage(m.chat, { text: `📲 Código de emparejamiento: ${pairing} (expira en 15s)` }, { quoted: m });
      console.log(`Código de emparejamiento para ${userId}:`, pairing);
    } catch (err) {
      mainClient.sendMessage(m.chat, { text: "❌ Error al generar código de emparejamiento, inténtalo de nuevo." }, { quoted: m });
      exec(`rm -rf ${sessionDir}`);
      subBots.delete(userId);
      return;
    }
  }

  subClient.ev.on("connection.update", (update) => {
    const { qr, connection, lastDisconnect } = update;

    if (qr) {
      qrcode.generate(qr, { small: true });
      mainClient.sendMessage(m.chat, { text: "📲 Escanea el QR en consola para activar tu sub-bot temporal." }, { quoted: m });
    }

    if (connection === "close") {
      subBots.delete(userId);
      mainClient.sendMessage(m.chat, { text: "⚠️ Tu sub-bot temporal se desconectó." }, { quoted: m });
    }

    if (connection === "open") {
      mainClient.sendMessage(m.chat, { text: "✅ Sub-bot temporal conectado exitosamente." }, { quoted: m });
    }
  });

  subClient.ev.on("creds.update", saveCreds);
}

module.exports = { startSubBot };
