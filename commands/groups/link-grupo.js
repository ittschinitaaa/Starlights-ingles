// codigo creado por: Chinita 🇨🇳
module.exports = {
  command: ["link", "linkgrupo", "grouplink"],
  description: "Muestra el link de invitación del grupo",
  category: "groups",
  isGroup: true,
  isAdmin: true,
  botAdmin: true,
  run: async (client, m) => {
    try {
      let invite = await client.groupInviteCode(m.chat);
      m.reply(`🔗 Link del grupo:\nhttps://chat.whatsapp.com/${invite}`);
    } catch (e) {
      console.error(e);
      m.reply("❌ No pude obtener el link del grupo");
    }
  },
};
