// codigo creado por china
// github.com/ittschinitaaa
module.exports = {
  command: ["close", "cerrar"],
  description: "Close the group (only admins can speak)",
  category: "groups",
  isGroup: true,
  isAdmin: true,
  botAdmin: true,
  run: async (client, m) => {
    try {
      await client.groupSettingUpdate(m.chat, "announcement");
      await m.react('✅');
      //m.reply("🔒 El grupo ahora está *cerrado* .");
    } catch (e) {
      console.error(e);
      m.reply("❌ The group could not be closed");
    }
  },
};
