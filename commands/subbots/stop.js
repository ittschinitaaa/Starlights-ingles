// código creado por china
// github.com/ittschinitaaa

const fs = require("fs");
const path = require("path");

module.exports = {
  command: ["stopsubbot", "offsubbot"],
  description: "Desconecta tu sub-bot manualmente",
  category: "subbots",
  run: async (client, m) => {
    const userJid = m.sender;
    const sessionFolder = path.join("./subbots", userJid.replace(/[^0-9]/g, "") + "_session");

    if (!fs.existsSync(sessionFolder)) return m.reply("⚠️ No tienes ningún sub-bot activo.");

    fs.rmSync(sessionFolder, { recursive: true, force: true });

    const file = "./subbots/data.json";
    if (fs.existsSync(file)) {
      let data = JSON.parse(fs.readFileSync(file));
      data.subbots = data.subbots.filter((s) => s.jid !== userJid);
      fs.writeFileSync(file, JSON.stringify(data, null, 2));
    }

    m.reply("🌙 Tu sub-bot fue cerrado correctamente.\n¡Gracias por usar Starlights 💫!");
  },
};
