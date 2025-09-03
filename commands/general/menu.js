// commands/general/menu.js
module.exports = {
  command: ["menu", "help"],
  description: "Muestra el menú del bot con comandos disponibles",
  category: "general",
  async run(client, m, args, { prefix }) {
    try {
      const menuText = `
╭━━━〔 *✨ Menú de ${client.user.name} ✨* 〕━━━╮

👑 *Información*
│ ${prefix}creador
│ ${prefix}info
│ ${prefix}ping
│ ${prefix}runtime

👥 *Grupos*
│ ${prefix}admins
│ ${prefix}tagall
│ ${prefix}close
│ ${prefix}open

🛠️ *Herramientas*
│ ${prefix}sticker
│ ${prefix}toimg
│ ${prefix}tts

╰━━━━━━━━━━━━━━━━━━━━╯

> 🤖 Bot creado con 💖 por *Mía* 
`;

      await client.sendMessage(m.chat, {
        image: { url: "https://telegra.ph/file/6d85c18b5fced13fd4bd3.jpg" }, // 🌸 Aquí cambias la imagen
        caption: menuText,
        buttons: [
          { buttonId: `${prefix}creador`, buttonText: { displayText: "👑 Creador" }, type: 1 },
          { buttonId: `${prefix}info`, buttonText: { displayText: "ℹ️ Info" }, type: 1 },
          { buttonId: `${prefix}admins`, buttonText: { displayText: "👥 Admins" }, type: 1 }
        ],
        headerType: 4
      }, { quoted: m });

    } catch (error) {
      console.error("Error en el comando menú:", error);
      await m.reply("❌ Hubo un error al mostrar el menú.");
    }
  }
};

/*const moment = require("moment-timezone");
const { pickRandom } = require("../../lib/message");
const { version } = require("../../package.json");

module.exports = {
  command: ["help", "ayuda", "menu"],
  description: "Muestra los comandos",
  category: "general",
  run: async (client, m, args) => {
    const cmds = [...global.comandos.values()];

    const jam = moment.tz("America/Mexico_City").format("HH:mm:ss");
    const ucapan =
      jam < "05:00:00"
        ? "Buen día"
        : jam < "11:00:00"
          ? "Buen día"
          : jam < "15:00:00"
            ? "Buenas tardes"
            : jam < "19:00:00"
              ? "Buenas tardes"
              : "Buenas noches";

    const fkontak = {
      key: {
        participant: `0@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: `6285600793871-1614953337@g.us` } : {}),
      },
      message: {
        contactMessage: {
          displayName: `${m.pushName || author}`,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${m.pushName || author},;;;\nFN:${m.pushName || author},\nitem1.TEL;waid=${m.sender.split("@")[0]}:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
          jpegThumbnail: null,
          thumbnail: null,
          sendEphemeral: true,
        },
      },
    };

    const categories = {};
    cmds.forEach((cmd) => {
      if (!cmd.command) return;
      const cat = (cmd.category || "sin categoría").toLowerCase();
      if (!categories[cat]) categories[cat] = [];
      if (!categories[cat].some((c) => c.command[0] === cmd.command[0])) {
        categories[cat].push(cmd);
      }
    });

    let menu = `╭──❮ *Menú de comandos* ❯──╮
│
│  ${ucapan}, *${m.pushName || "Usuario"}*
│
│  *⚞⭐̶𑂳ׅᭃֺ๋ᰍׅ(𝐒)ִ𝕋𝐀ֹℝ𝐋𝕀𝐆𝐇ℍ𝐓𝕊ִ༷̫֠⚟*
│  Creadora : 𝐂𝐡𝐢𝐧𝐚 🇨🇳🔥
│  Versión  : ${version}
│  Motor    : Baileys
│
`;

    for (const [cat, commands] of Object.entries(categories)) {
      const catName = cat.charAt(0).toUpperCase() + cat.slice(1);
      menu += `│─── *${catName}*\n`;
      commands.forEach((cmd) => {
        menu += `│  !${cmd.command[0]}\n`;
      });
      menu += `│\n`;
    }

    menu += `╰─────────────────╯`;

    await client.sendMessage(
      m.chat,
      {
        image: { url: "https://files.catbox.moe/sklz18.png" },
        caption: menu,
      },
      { quoted: fkontak },
    );
  },
};
*/
