// codigo creado por: Chinita 🇨🇳
module.exports = {
  command: ["owner", "creador"],
  description: "Muestra información del creador del bot",
  category: "general",
  isGroup: false,
  run: async (client, m) => {
    try {
      const ownerNumber = global.owner[0][0] + "@s.whatsapp.net";
      const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${global.owner[0][1] || "Creador"}
ORG:Propietario del bot
TEL;type=CELL;type=VOICE;waid=${global.owner[0][0]}:${global.owner[0][0]}
END:VCARD
      `.trim();

      await client.sendMessage(m.chat, {
        contacts: { displayName: "Owner", contacts: [{ vcard }] },
      }, { quoted: m });

      await m.reply("👑 Este es el contacto de mi *creador*");
    } catch (e) {
      console.error(e);
      m.reply("❌ No pude enviar la información del creador");
    }
  },
};
