// código creado por china
// github.com/ittschinitaaa

const path = require("path");
const fs = require("fs");
const { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys");
const pino = require("pino");
const chalk = require("chalk");

module.exports = {
  command: ["code", "pair", "vincular"],
  description: "Genera un código para vincular un sub-bot con Starlights",
  category: "jadibot",
  isGroup: false,
  isPrivate: true,

  run: async (client, m) => {
    try {
      const sender = m.sender.split("@")[0];
      const subPath = path.join(__dirname, `../../subbots/${sender}`);
      const fsExists = fs.existsSync(subPath);

      if (!fsExists) fs.mkdirSync(subPath, { recursive: true });

      const { state, saveCreds } = await useMultiFileAuthState(subPath);
      const { version } = await fetchLatestBaileysVersion();

      const subClient = makeWASocket({
        version,
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        browser: ["SubBot", "Chrome", "10.0"],
        auth: state,
      });

      if (!subClient.authState.creds.registered) {
        const code = await subClient.requestPairingCode(sender);
        await m.reply(`🌟 *Starlights SubBot*\n\nTu código de vinculación es:\n\n*${code}*\n\n👉 Copia este código y pégalo en WhatsApp para conectar tu sub-bot.`);
        await subClient.ev.on("creds.update", saveCreds);
      } else {
        await m.reply("Ya existe una sesión de sub-bot vinculada a tu número 🌸");
      }
    } catch (e) {
      console.error(e);
      m.reply("❌ Error al generar el código. Intenta de nuevo más tarde.");
    }
  },
};
