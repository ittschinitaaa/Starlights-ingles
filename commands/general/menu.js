const moment = require("moment-timezone");
//const { version } = require("../../package.json");

module.exports = {
  command: ["menu", "help", "ayuda"],
  description: "Muestra la lista de comandos del bot",
  category: "general",
  run: async (client, m, args) => {
    const cmds = [...global.comandos.values()];

    // Saludo según hora
    const jam = moment.tz("America/Argentina/Buenos_Aires").format("HH:mm:ss");
    const ucapan =
      jam < "05:00:00"
        ? "🌙 Good day"
        : jam < "11:00:00"
        ? "☀️ Good day"
        : jam < "15:00:00"
        ? "🌤️ Good afternoon"
        : jam < "19:00:00"
        ? "🌆 Good afternoons"
        : "🌙 Good night";

    // Contacto citado
    const fkontak = {
      key: {
        participant: `0@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: `0@s.whatsapp.net` } : {}),
      },
      message: {
        contactMessage: {
          displayName: `${m.pushName || "Usuario"}`,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${m.pushName || "Usuario"},;;;\nFN:${m.pushName || "Usuario"}\nitem1.TEL;waid=${
            m.sender.split("@")[0]
          }:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
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

      await m.react("🌟");
    
    let menu = `
✼─────────────✼
${ucapan}, *${m.pushName || "Usuario"}*
✿ 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 ${global.namebot}
✿ 𝗩𝗲𝗿𝘀𝗶𝗼𝗻: ${version}
✿ 𝗢𝘄𝗻𝗲𝗿: ${owner2}
✼─────────────✼\n`;

    for (const [cat, commands] of Object.entries(categories)) {
      const catName = cat.charAt(0).toUpperCase() + cat.slice(1);
      menu += `╭──★ *${catName}* ★──╮\n`;
      commands.forEach((cmd) => {
        menu += `│ • #${cmd.command[0]}\n`;
      });
      menu += `╰────────────╯\n\n`;
    }

    menu += `> ${dev}`;

    await client.sendMessage(
      m.chat,
      {
        text: menu,
        contextInfo: {
          forwardingScore: 0,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363345778623279@newsletter", // tu canal
            serverMessageId: "1",
            newsletterName: "=͟͟͞͞𝐒𝐩𝐚𝐜𝐞 𝐖𝐨𝐫𝐥𝐝 - 𝐎𝐟𝐟𝐢𝐜𝐢𝐚𝐥 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 ✰",
          },
          externalAdReply: {
            title: "⭑ 𝗦𝘁𝗮𝗿𝗹𝗶𝗴𝗵𝘁𝘀 - 𝗕𝗼𝘁 🌟",
            body: "Starlights, created with love by 𝕮𝖍𝖎𝖓𝖆 🔥",
            thumbnailUrl: "https://files.catbox.moe/e1lirs.jpg", // tu imagen actual
            sourceUrl: "https://starlights.vercel.app", // tu página o canal
            mediaType: 1,
            renderLargerThumbnail: true, // hace que se vea como “tarjeta grande”
          },
        },
      },
      { quoted: fkontak }
    );
  },
};
