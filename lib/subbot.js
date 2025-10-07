// lib/subbot.js
// ✨ Sistema de Sub-Bots por Chinita
// Soporte para QR y Código de Emparejamiento (8 dígitos)

const fs = require("fs");
const path = require("path");
const pino = require("pino");
const { makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys");
const chalk = require("chalk");

async function startSubBot(mainClient, m, usePairing = false) {
  try {
    const sessionPath = path.join(process.cwd(), "star_session", `subbot_${m.sender.split("@")[0]}`);
    if (!fs.existsSync("star_session")) fs.mkdirSync("star_session");

    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    const { version } = await fetchLatestBaileysVersion();

    const subBot = makeWASocket({
      version,
      printQRInTerminal: !usePairing,
      logger: pino({ level: "silent" }),
      browser: ["Starlights-SubBot", "Chrome", "6.0"],
      auth: state,
    });

    // 🌀 Enviar QR o Código de Emparejamiento
    if (usePairing) {
      let code = await subBot.requestPairingCode(m.sender.split("@")[0]);
      m.reply(`🔐 Tu código de emparejamiento es:\n\n*${code}*\n\n⏳ Usa este código en tu WhatsApp en 1 minuto.`);
    } else {
      m.reply("📲 Escanea este *QR* que aparece en la consola para conectar tu sub-bot temporal.");
    }

    subBot.ev.on("connection.update", async (update) => {
      const { connection, lastDisconnect } = update;

      if (connection === "open") {
        console.log(chalk.greenBright(`[✅ SubBot conectado] ${m.sender}`));
        await mainClient.sendMessage(
          m.chat,
          { text: "✅ Sub-bot conectado con éxito. Ahora puedes usarlo temporalmente." },
          { quoted: m }
        );
      }

      if (connection === "close") {
        const reason = lastDisconnect?.error?.output?.statusCode;
        if (reason === DisconnectReason.loggedOut || reason === 401) {
          fs.rmSync(sessionPath, { recursive: true, force: true });
          console.log(chalk.redBright(`[🔴 SubBot cerrado y sesión eliminada] ${m.sender}`));
        }
      }
    });

    subBot.ev.on("creds.update", saveCreds);

  } catch (err) {
    console.error(chalk.red("❌ Error iniciando subbot:"), err);
    m.reply("⚠️ Ocurrió un error al generar tu sub-bot. Intenta nuevamente.");
  }
}

module.exports = { startSubBot };
