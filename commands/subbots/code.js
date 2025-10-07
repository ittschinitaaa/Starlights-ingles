// código creado por china
// github.com/ittschinitaaa

const { makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const fs = require("fs");
const path = require("path");
const pino = require("pino");
const crypto = require("crypto");

module.exports = {
  command: ["code", "subbotcode"],
  description: "Conecta un sub-bot mediante código de 8 dígitos",
  category: "subbots",
  run: async (client, m) => {
    const userJid = m.sender;
    const sessionFolder = path.join("./subbots", userJid.replace(/[^0-9]/g, "") + "_session");

    if (!fs.existsSync("./subbots")) fs.mkdirSync("./subbots");
    if (!fs.existsSync(sessionFolder)) fs.mkdirSync(sessionFolder);

    const code = crypto.randomBytes(4).toString("hex").toUpperCase();
    m.reply(`💫 *Código de conexión generado*\n\n🔢 Usa este código en otro dispositivo:\n> *${code}*\n\n⏰ Expira en 1 hora.`);

    const { state, saveCreds } = await useMultiFileAuthState(sessionFolder);
    const sock = makeWASocket({
      printQRInTerminal: false,
      logger: pino({ level: "silent" }),
      auth: state,
      browser: ["Starlights SubBot", "Safari", "1.0.0"],
    });

    sock.ev.on("connection.update", (update) => {
      const { connection } = update;
      if (connection === "open") {
        client.sendMessage(m.chat, {
          text: `✅ Sub-bot vinculado correctamente con el código ${code}`,
        });
        registrarSubbot(userJid, m.pushName, code);
        setTimeout(() => cerrarSubbot(sessionFolder, userJid, client), 60 * 60 * 1000);
      }
    });

    sock.ev.on("creds.update", saveCreds);
  },
};

function registrarSubbot(jid, nombre, codigo) {
  const file = "./subbots/data.json";
  let data = { subbots: [] };
  if (fs.existsSync(file)) data = JSON.parse(fs.readFileSync(file));
  data.subbots.push({ jid, nombre, codigo, fecha: new Date().toISOString() });
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
  client.sendMessage(jid, { text: "🕐 Tu sub-bot expiró automáticamente." });
}
