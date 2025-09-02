module.exports = {
  name: "admins",
  category: "groups",
  isGroup: true,
  botAdmin: false,
  run: async (conn, m, args) => {
    if (!m.isGroup) return m.reply("Este comando solo funciona en grupos");

    // Obtener información del grupo
    const metadata = await conn.groupMetadata(m.chat);
    const participants = metadata.participants || [];

    // Filtrar solo los admins
    const admins = participants
      .filter(p => p.admin === "admin" || p.admin === "superadmin")
      .map(p => p.id);

    if (admins.length === 0) return m.reply("No hay administradores en este grupo.");

    // Crear mensaje con menciones
    let text = "👑 Administradores del grupo:\n\n";
    text += admins.map(id => `@${id.split("@")[0]}`).join("\n");

    await conn.sendMessage(
      m.chat,
      { text, mentions: admins },
      { quoted: m }
    );
  },
};
