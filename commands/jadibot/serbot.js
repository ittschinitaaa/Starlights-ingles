// código creado por china
// github.com/ittschinitaaa

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

module.exports = {
  command: ["code", "pairingcode", "subbot"],
  description: "Genera un código para vincular un sub-bot a Starlights",
  category: "subbots",
  isPrivate: false,
  run: async (client, m) => {
    try {
      const code = crypto.randomInt(10000000, 99999999).toString();
      const file = path.join(__dirname, "../../pairing_codes.json");

      let data = {};
      if (fs.existsSync(file)) data = JSON.parse(fs.readFileSync(file));

      data[code] = {
        owner: m.sender,
        createdAt: Date.now(),
        expiresAt: Date.now() + 5 * 60 * 1000,
      };
      fs.writeFileSync(file, JSON.stringify(data, null, 2));

      await m.reply(
        `✨ *Código generado exitosamente*\n\n🔑 *Código:* ${code}\n🕒 Válido por *5 minutos*\n\nPara conectar un sub-bot, escribe:\n#connect ${code}`,
      );
    } catch (err) {
      console.log(err);
      m.reply("Ocurrió un error al generar el código");
    }
  },
};
