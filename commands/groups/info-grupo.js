// codigo creado por china
// github.com/ittschinitaaa
module.exports = {
  command: ["infogrupo", "groupinfo"],
  description: "Displays group information",
  category: "groups",
  isGroup: true,
  isAdmin: false,
  botAdmin: false,
  run: async (client, m) => {
    try {
      const group = await client.groupMetadata(m.chat);
      let info = `👥 *Name:* ${group.subject}
📝 *Description:* ${group.desc || "No description"}
🔒 *ID:* ${m.chat}
👑 *Owner:* ${group.owner ? group.owner.split("@")[0] : "Not defined"}
📅 *Created:* ${new Date(group.creation * 1000).toLocaleString()}
👤 *Members:* ${group.participants.length}`;

      m.reply(info);
    } catch (e) {
      console.error(e);
      m.reply("❌ I couldn't get the group information");
    }
  },
};
