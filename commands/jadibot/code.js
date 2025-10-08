// código creado por china
// github.com/ittschinitaaa
// comando: #code — genera un código real de emparejamiento

const fs = require("fs");
const path = require("path");
const pino = require("pino");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
} = require("@whiskeysockets/baileys");

module.exports = {
  command: ["code", "pairingcode", "subbot"],
  description: "Genera un código de emparejamiento para vincular un sub-bot",
  category: "subbots",
  isGroup: false,
  isAdmin: false,
  botAdmin: false,

  run: async (client, m, args) => {
    try {
      const senderNumber = m.sender.split("@")[0];
      const sessionPath = path.join(process.cwd(), "sessions-sub", senderNumber);

      if (!fs.existsSync(sessionPath))
        fs.mkdirSync(sessionPath, { recursive: true });

      const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
      const { version } = await fetchLatestBaileysVersion();

      const sock = makeWASocket({
        version,
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        browser: ["Starlights-SubBot", "Chrome", "1.0.0"],
        auth: state,
      });

      sock.ev.on("creds.update", saveCreds);

      if (!sock.authState.creds.registered) {
        await m.reply("🌸 *Generando tu código de emparejamiento...*");

        const code = await sock.requestPairingCode(senderNumber);
        await client.sendMessage(m.chat, {
          text: `✅ *Código de emparejamiento generado correctamente*\n\n> 🔐 Código: *${code}*\n\n📱 Usa este código en otro dispositivo para conectar tu *sub-bot Starlights*.\n⚠️ *Caduca en 1 minuto.*`,
        });

        sock.ev.on("connection.update", async (update) => {
          const { connection } = update;
          if (connection === "open") {
            await client.sendMessage(m.chat, {
              text: "💫 *Sub-bot conectado correctamente.*",
            });
          }
        });
      } else {
        await m.reply(
          "⚠️ Ya tienes una sesión activa. Elimina tu sesión antes de generar un nuevo código."
        );
      }
    } catch (e) {
      console.error(e);
      await m.reply("❌ Error al generar el código de emparejamiento.");
    }
  },
};
