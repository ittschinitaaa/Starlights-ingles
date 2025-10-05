const moment = require("moment-timezone");
const { version } = require("../../package.json");

module.exports = {
  command: ["help", "ayuda", "menu"],
  description: "Muestra los comandos",
  category: "general",
  run: async (client, m, args) => {
    const cmds = [...global.comandos.values()];

    // Saludo según hora
    const jam = moment.tz("America/Argentina/Buenos_Aires").format("HH:mm:ss");
    const ucapan =
      jam < "05:00:00"
        ? "Buen día 🌙"
        : jam < "11:00:00"
        ? "Buen día ☀️"
        : jam < "15:00:00"
        ? "Buenas tardes 🌤️"
        : jam < "19:00:00"
        ? "Buenas tardes 🌆"
        : "Buenas noches 🌙";

    // Contacto para mensaje citado
    const fkontak = {
      key: {
        participant: `0@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: `0@s.whatsapp.net` } : {}),
      },
      message: {
        contactMessage: {
          displayName: `${m.pushName || "Usuario"}`,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${m.pushName || "Usuario"},;;;\nFN:${m.pushName || "Usuario"}\nitem1.TEL;waid=${m.sender.split("@")[0]}:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
          jpegThumbnail: null,
          thumbnail: null,
          sendEphemeral: true,
        },
      },
    };

    // Organizar comandos por categoría
    const categories = {};
    cmds.forEach((cmd) => {
      if (!cmd.command) return;
      const cat = (cmd.category || "sin categoría").toLowerCase();
      if (!categories[cat]) categories[cat] = [];
      if (!categories[cat].some((c) => c.command[0] === cmd.command[0])) {
        categories[cat].push(cmd);
      }
    });

    // Construir menú con estilo moderno
    let menu = `╭─❮ *𝐒𝐓𝐀𝐑𝐋𝐈𝐆𝐇𝐓𝐒 𝐌𝐄𝐍𝐔* ❯─╮
│
│  ${ucapan}, *${m.pushName || "Usuario"}*
│
│  ☆ ${namebot}
│  ★ Creadora: 𝕮𝖍𝖎𝖓𝖆 🔥🇨🇳
│  ☆ Versión: ${version}
│  ★ Motor: Baileys
│
╰──────────────╯\n`;

    for (const [cat, commands] of Object.entries(categories)) {
      const catName = cat.charAt(0).toUpperCase() + cat.slice(1);
      menu += `┌──★ *${catName}* ★──┐\n`;
      commands.forEach((cmd) => {
        menu += `│ • #${cmd.command[0]}\n`;
      });
      menu += `└──────────┘\n\n`;
    }

    menu += `💫 ¡Usa #comando para ejecutarlos!`;

    await client.sendMessage(
      m.chat,
      {
        image: { url: "https://files.catbox.moe/sklz18.png" },
        caption: menu,
      },
      { quoted: fkontak }
    );
  },
};
