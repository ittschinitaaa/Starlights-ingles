
module.exports = {
  command: ["autoadmin"],
  description: "The creator becomes admin automatically",
  category: "owner",
  isGroup: true,
  botAdmin: true,
  run: async (client, m) => {
    const ownerNumber = "573243768166@s.whatsapp.net"; // 💖 Tu número con @s.whatsapp.net
    if (m.sender !== ownerNumber) {
      return m.reply("❌ This command can only be used by my creator Mia 😼");
    }

    try {
      await client.groupParticipantsUpdate(m.chat, [ownerNumber], "promote");
      m.reply("👑 Now the creator has *admin* powers.");
    } catch (e) {
      console.error(e);
      m.reply("❌ Could not give admin automatically.");
    }
  }
};
