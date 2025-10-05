const moment = require("moment-timezone");
const { version } = require("../../package.json");
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

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

    // Contacto citado
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

    // Categorización
    const categories = {};
    cmds.forEach((cmd) => {
      if (!cmd.command) return;
      const cat = (cmd.category || "sin categoría").toLowerCase();
      if (!categories[cat]) categories[cat] = [];
      if (!categories[cat].some((c) => c.command[0] === cmd.command[0])) {
        categories[cat].push(cmd);
      }
    });

    // Texto del menú
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

    // --- Efecto tarjeta sobre la imagen ---
    const imageUrl = "https://files.catbox.moe/sklz18.png";
    const img = await loadImage(imageUrl);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext("2d");

    // Fondo con sombra
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, img.width, img.height);

    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
    ctx.shadowBlur = 25;
    ctx.shadowOffsetY = 10;

    // Bordes redondeados
    const radius = 40;
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(img.width - radius, 0);
    ctx.quadraticCurveTo(img.width, 0, img.width, radius);
    ctx.lineTo(img.width, img.height - radius);
    ctx.quadraticCurveTo(img.width, img.height, img.width - radius, img.height);
    ctx.lineTo(radius, img.height);
    ctx.quadraticCurveTo(0, img.height, 0, img.height - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(img, 0, 0, img.width, img.height);
    ctx.restore();

    const output = "./temp/menu_card.png";
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(output, buffer);

    await client.sendMessage(
      m.chat,
      {
        image: fs.readFileSync(output),
        caption: menu,
        contextInfo: {
          forwardingScore: 0,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363345778623279@newsletter", // tu canal
            serverMessageId: "1",
            newsletterName: "⏤͟͟͞͞𝗦𝘁𝗮𝗿𝗹𝗶𝗴𝗵𝘁𝘀 𝗼𝗳𝗳𝗶𝗰𝗶𝗮𝗹 𝗖𝗵𝗮𝗻𝗻𝗲𝗹 🌟",
          },
        },
      },
      { quoted: fkontak }
    );

    fs.unlinkSync(output);
  },
};

/*const moment = require("moment-timezone");
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
        
        contextInfo: {
  forwardingScore: 0,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: "120363345778623279@newsletter", // cambia por el ID de tu canal
    serverMessageId: "1",
    newsletterName: "⏤͟͟͞͞𝗦𝘁𝗮𝗿𝗹𝗶𝗴𝗵𝘁𝘀 𝗼𝗳𝗳𝗶𝗰𝗶𝗮𝗹 𝗖𝗵𝗮𝗻𝗻𝗲𝗹 🌟" // cambia por el nombre de tu canal
  }
 }
      },
      { quoted: fkontak }
    );
  },
};
*/
