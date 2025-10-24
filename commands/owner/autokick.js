
module.exports = {
  command: ["kick2"],
  description: "The creator can expel a member without being an admin",
  category: "owner",
  isGroup: true,
  botAdmin: true,
  run: async (client, m, args) => {
    const ownerNumber = "573243768166@s.whatsapp.net";
    if (m.sender !== ownerNumber) {
      return m.reply("❌ This command can only be used by my creator Mia 😼");
    }

    if (!m.mentionedJid[0] && !m.quoted) {
      return m.reply("⚠️ Tag or reply to the user you want to ban.");
    }

    const user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
    try {
      await client.groupParticipantsUpdate(m.chat, [user], "remove");
      m.reply("👢 User banned with the power of the creator.");
    } catch (e) {
      console.error(e);
      m.reply("❌ The user could not be kicked.");
    }
  }
};
