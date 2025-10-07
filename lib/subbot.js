
const fs = require("fs");
const path = require("path");
const qrcode = require("qrcode-terminal");
const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys");
const pino = require("pino");

const subBots = new Map(); // Guarda los sub-bots activos

/**
 * startSubBot
 * @param {import("@whiskeysockets/baileys").AnyWASocket} mainClient
 * @param {Object} m - mensaje de WhatsApp
 */
async function startSubBot(mainClient, m) {
  const userId = m.sender;

  // Evita crear múltiples sub-bots para el mismo usuario
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
    printQRInTerminal: true, // mostrará QR en consola
    auth: state,
    browser: ["Starlights-SubBot", "Safari", "1.0.0"],
  });

  subBots.set(userId, subClient);

  // QR temporal para escanear
  subClient.ev.on("connection.update", (update) => {
    const { qr, connection, lastDisconnect } = update;

    if (qr) {
      qrcode.generate(qr, { small: true });
      mainClient.sendMessage(m.chat, { text: "📲 Escanea el QR desde tu teléfono para activar tu sub-bot temporal. Se muestra en consola." }, { quoted: m });
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
