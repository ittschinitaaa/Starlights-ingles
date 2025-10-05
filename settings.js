const fs = require("fs");
const chalk = require("chalk");

global.owner = ["573243768166"]; //Cambia este número por el tuyo
global.sessionName = "star_session";
global.version = "v1.0.0 | Mini";
global.namebot = "⚞⭐̶𑂳ׅᭃֺ๋ᰍׅ(𝐒)ִ𝕋𝐀ֹℝ𝐋𝕀𝐆𝐇ℍ𝐓𝕊ִ༷̫֠⚟";
global.author = "𝐂𝐡𝐢𝐧𝐚 | 𝐒𝐭𝐚𝐫𝐥𝐢𝐠𝐡𝐭𝐬";

//Modifica los mensajes a tu preferencia
global.mess = {
  admin: "→ Esta función está reservada para los administradores del grupo",
  botAdmin: "→ Para ejecutar esta función debo ser administrador",
  owner: "→ Solo mi creador puede usar este comando",
  group: "→ Esta función solo funciona en grupos",
  private: "→ Esta función solo funciona en mensajes privados",
  wait: "→ Espera un momento...",
};

global.thumbnailUrl = "https://files.catbox.moe/sklz18.png"; //Cambia esta imagen

global.my = {
  ch: "120363400593383200@newsletter", //Cambia este id por el de tu canal
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.yellowBright(`Actualización '${__filename}'`));
  delete require.cache[file];
  require(file);
});
