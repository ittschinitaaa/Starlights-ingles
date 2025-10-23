const fs = require("fs");
const chalk = require("chalk");

global.owner = ["573243768166"]; //Cambia este número por el tuyo
global.owner2 = ["https://wa.me/573243768166"] //cambialo por tu enlace
global.sessionName = "star_session";
global.version = "v1.0.0 | Mini";
global.namebot = "⚞⭐̶𑂳ׅᭃֺ๋ᰍׅ(𝐒)ִ𝕋𝐀ֹℝ𝐋𝕀𝐆𝐇ℍ𝐓𝕊ִ༷̫֠⚟";
global.author = "𝕮𝖍𝖎𝖓𝖆 🔥";
global.dev = "© 𝖯𝗈𝗐𝖾𝗋𝖾𝖽 𝖻𝗒 𝖢𝖧𝖨𝖭𝖨𝖳𝖠 | ᵒᶠᶦᶜᶦᵃˡ"

//Modifica los mensajes a tu preferencia
global.mess = {
  admin: "> ☆ This function is reserved for group administrators.",
  botAdmin: "> ☆ To perform this function, I must be an administrator",
  owner: "> ☆ Only my creator can use this command",
  group: "> ☆ This feature only works in groups",
  private: "> ☆ This feature only works in private messages.",
  wait: "> ☆ Hang on a minute...",
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
