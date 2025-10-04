// codigo creado por china
// github.com/ittschinitaaa
module.exports = {
  command: ["close", "cerrar"],
  description: "Cierra el grupo (solo admins pueden hablar)",
  category: "groups",
  isGroup: true,
  isAdmin: true,
  botAdmin: true,
  run: async (client, m) => {
    try {
      await client.groupSettingUpdate(m.chat, "announcement");
      m.reply("🔒 El grupo ahora está *cerrado* .");
    } catch (e) {
      console.error(e);
      m.reply("❌ No se pudo cerrar el grupo");
    }
  },
};
