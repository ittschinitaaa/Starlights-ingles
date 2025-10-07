// código creado por china
// github.com/ittschinitaaa

const { makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const fs = require("fs");
const path = require("path");
const pino = require("pino");

module.exports = {
  command: ["qr", "subbotqr"],
  description: "Conecta un sub-bot mediante código QR",
  category: "subbots",
  run: async (client, m) => {
    try {
      const userJid = m.sender;
      const sessionFolder = path.join("./subbots", userJid.replace(/[^0-9]/g, "") + "_session");

      if (!fs.existsSync("./subbots")) fs.mkdirSync("./subbots");
      if (!fs.existsSync(sessionFolder)) fs.mkdirSync(sessionFolder);

      m.reply("🌙 *Generando tu código QR...*\n\nEscanea el QR para conectar tu sub-bot 💫");

      const { state, saveCreds } = await useMultiFileAuthState(sessionFolder);
      const sock = makeWASocket({
        printQRInTerminal: false,
        logger: pino({ level: "silent" }),
        auth: state,
        browser: ["Starlights SubBot", "Chrome", "1.0.0"],
      });

      sock.ev.on("connection.update", (update) => {
        const { connection, qr } = update;
        if (qr) {
          client.sendMessage(m.chat, {
            image: { url: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qr)}` },
            caption: "✨ Escanea este código QR para conectar tu sub-bot.",
          });
        }

        if (connection === "open") {
          client.sendMessage(m.chat, {
            text: `✅ *Sub-bot conectado exitosamente*\n\n👤 Vinculado a: ${m.pushName}\n🕐 Sesión activa por 1 hora.`,
          });
          registrarSubbot(userJid, m.pushName);
          setTimeout(() => cerrarSubbot(sessionFolder, userJid, client), 60 * 60 * 1000);
        }

        if (connection === "close") {
          cerrarSubbot(sessionFolder, userJid, client);
        }
      });

      sock.ev.on("creds.update", saveCreds);
    } catch (err) {
      console.error(err);
      m.reply("⚠️ Ocurrió un error al generar el QR.");
    }
  },
};

function registrarSubbot(jid, nombre) {
  const file = "./subbots/data.json";
  let data = { subbots: [] };
  if (fs.existsSync(file)) data = JSON.parse(fs.readFileSync(file));
  data.subbots.push({ jid, nombre, fecha: new Date().toISOString() });
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function cerrarSubbot(folder, jid, client) {
  if (fs.existsSync(folder)) fs.rmSync(folder, { recursive: true, force: true });
  const file = "./subbots/data.json";
  if (fs.existsSync(file)) {
    let data = JSON.parse(fs.readFileSync(file));
    data.subbots = data.subbots.filter((s) => s.jid !== jid);
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  }
  client.sendMessage(jid, { text: "🕐 Tu sub-bot se ha desconectado automáticamente." });
}
