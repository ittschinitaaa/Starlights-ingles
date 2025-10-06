// código creado por china
// github.com/ittschinitaaa

const fs = require("fs");
const path = require("path");

module.exports = {
  command: ["connect", "link", "pair"],
  description: "Conecta un sub-bot a Starlights mediante un código",
  category: "jadibot",
  isPrivate: false,
  run: async (client, m, args) => {
    const code = args[0];
    if (!code)
      return m.reply("🔑 Ingresa el código de emparejamiento.\nEjemplo: #connect 12345678");

    const file = path.join(__dirname, "../../pairing_codes.json");
    if (!fs.existsSync(file)) return m.reply("⚠️ No hay códigos activos, genera uno con #code");

    const data = JSON.parse(fs.readFileSync(file));
    const info = data[code];
    if (!info) return m.reply("❌ Código inválido o expirado");
    if (Date.now() > info.expiresAt) return m.reply("⌛ El código expiró");

    m.reply(`✅ *Conectando sub-bot...*`);

    setTimeout(() => {
      delete data[code];
      fs.writeFileSync(file, JSON.stringify(data, null, 2));
      client.sendMessage(m.chat, { text: "🌟 Sub-bot vinculado exitosamente a *Starlights*" });
    }, 3000);
  },
};
