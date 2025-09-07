// commands/general/menu.js
module.exports = {
  command: ["menu", "help"],
  description: "Muestra el menú del bot con comandos disponibles",
  category: "general",
  async run(client, m, args, { prefix }) {
    try {
      const menuText = `
‎
*¡𝙃𝙤𝙡𝙖!, 𝘽𝙞𝙚𝙣𝙫𝙚𝙣𝙞𝙙𝙤 𝙎𝙤𝙮 𝙎𝙩𝙖𝙧𝙡𝙞𝙜𝙝𝙩𝙨* 
Aǫᴜɪ ᴇsᴛᴀ ʟᴀ ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs: 
╭┈ ↷
│ ✐ 𝓓𝓮𝓿𝓮𝓵𝓸𝓹𝓮𝓭 𝓫𝔂  𝑪𝑯𝑰𝑵𝑰𝑻𝑨 | ᵒᶠᶦᶜᶦᵃˡ
│ ✐ ꒷ꕤ🌟ദ ᴄᴀɴᴀʟ ᴏғɪᴄɪᴀʟ ෴
│https://whatsapp.com/channel/0029Vb6MLeIH5JLzORX6351n
╰━━━━━━━━━━

> "Muchas copias, Pero ninguna como la original." 💋

 ╭ֹ┈ ⵿❀⵿ 𝑮𝑬𝑵𝑬𝑹𝑨𝑳
> 𝑽𝒆𝒓 𝒊𝒏𝒇𝒐𝒓𝒎𝒂𝒄𝒊𝒐́𝒏 𝒅𝒆 𝒍𝒂 𝑩𝒐𝒕. 

❒ #menu
> Ve la lista de Comandos. 
❒ #info
> Ver información completa. 
❒ #owner
> Ver creadora de la Bot. 
❒ #ping
> Ver velocidad de la bot. 
❒ #perfil

 ╭ֹ┈ ⵿❀⵿ 𝑫𝑬𝑺𝑪𝑨𝑹𝑮𝑨
> 𝑪𝒐𝒎𝒂𝒏𝒅𝒐𝒔 𝒅𝒆 𝑫𝒆𝒔𝒄𝒂𝒓𝒈𝒂𝒔. 

❒ #drive
> Descarga un Archivo de Drive. 
❒ #dropbox
> Descarga un Archivo de Dropbox. 
❒ #fb
> Descarga videos de Facebook. 
❒ #mediafire
> Descarga Archivos de MediaFire. 

 ╭ֹ┈ ⵿❀⵿ 𝑮𝑹𝑼𝑷𝑶𝑺
> 𝑪𝒐𝒎𝒂𝒏𝒅𝒐𝒔 𝒅𝒆 𝑴𝒐𝒅𝒆𝒓𝒂𝒄𝒊𝒐́𝒏 𝒅𝒆 𝑮𝒓𝒖𝒑𝒐𝒔. 

❒ #close
> La bot cerrará el grupo
❒ #open
> La bot abrirá el grupo. 
❒ #demote
> Degrada a un Usuario de admin. 
❒ #promote 
> Promueve a un Usuario a admin. 
❒ #hidetag
> Mención general (sin Lista) 
❒ #infogrupo
> Ve la información del Grupo. 
❒ #kick
> Elimina a un Usuario del Grupo. 
❒ #link
> La bot enviará el Link del Grupo. 
❒ #on
> Ve los Antis del Grupo. 
❒ #setdesc
> Cambia le descripción del Grupo. 
❒ #setname
> Cambia el nombre del Grupo. 

 ╭ֹ┈ ⵿❀⵿ 𝑪𝑹𝑬𝑨𝑫𝑶𝑹
> 𝑪𝒐𝒎𝒂𝒏𝒅𝒐𝒔 𝒑𝒂𝒓𝒂 𝒆𝒍 𝑪𝒓𝒆𝒂𝒅𝒐𝒓. 

❒ #update
> Actualiza el bot a la última versión. 
❒ #autoadmin
> El bot le dará admin al creador. 
❒ #autokick
> El creador del bot elimina usuario. 

 ╭ֹ┈ ⵿❀⵿ 𝑺𝑻𝑰𝑪𝑲𝑬𝑹𝑺
> 𝑪𝒐𝒎𝒂𝒏𝒅𝒐𝒔 𝒑𝒂𝒓𝒂 𝑪𝒓𝒆𝒂𝒓 𝒔𝒕𝒊𝒄𝒌𝒆𝒓𝒔. 

❒ #s
> Crea un sticker con una imagen.`;

      await client.sendMessage(m.chat, {
        image: { url: "https://files.catbox.moe/sklz18.png" }, // 🌸 Aquí cambias la imagen
        caption: menuText,
        buttons: [
          { buttonId: `#creador`, buttonText: { displayText:"#creador" }, type: 1 },
          { buttonId: `#info`, buttonText: { displayText: "#info" }, type: 1 },
          { buttonId: `#ping`, buttonText: { displayText: "#ping" }, type: 1 }
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
