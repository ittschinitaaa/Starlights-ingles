// commands/groups/autokick.js
module.exports = {
  command: ["autokick"],
  description: "El creador puede expulsar a un miembro sin ser admin",
  category: "owner",
  isGroup: true,
  botAdmin: true,
  run: async (client, m, args) => {
    const ownerNumber = "923256941884@s.whatsapp.net";
    if (m.sender !== ownerNumber) {
      return m.reply("❌ Este comando solo puede usarlo mi creadora Mía 😼");
    }

    if (!m.mentionedJid[0] && !m.quoted) {
      return m.reply("⚠️ Etiqueta o responde al usuario que quieres expulsar.");
    }

    const user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
    try {
      await client.groupParticipantsUpdate(m.chat, [user], "remove");
      m.reply("👢 Usuario expulsado con el poder de la creadora.");
    } catch (e) {
      console.error(e);
      m.reply("❌ No se pudo expulsar al usuario.");
    }
  }
};
