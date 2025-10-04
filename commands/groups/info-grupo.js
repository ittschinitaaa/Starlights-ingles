// codigo creado por china
// github.com/ittschinitaaa
module.exports = {
  command: ["infogrupo", "groupinfo"],
  description: "Muestra información del grupo",
  category: "groups",
  isGroup: true,
  isAdmin: false,
  botAdmin: false,
  run: async (client, m) => {
    try {
      const group = await client.groupMetadata(m.chat);
      let info = `👥 *Nombre:* ${group.subject}
📝 *Descripción:* ${group.desc || "Sin descripción"}
🔒 *ID:* ${m.chat}
👑 *Dueño:* ${group.owner ? group.owner.split("@")[0] : "No definido"}
📅 *Creado:* ${new Date(group.creation * 1000).toLocaleString()}
👤 *Miembros:* ${group.participants.length}`;

      m.reply(info);
    } catch (e) {
      console.error(e);
      m.reply("❌ No pude obtener la información del grupo");
    }
  },
};
