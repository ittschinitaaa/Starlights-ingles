module.exports = {
  name: "tagall",
  category: "groups",
  isGroup: true,
  botAdmin: true,
  run: async (conn, m, args) => {
    if (!m.isGroup) return m.reply("Este comando solo funciona en grupos");

    try {
      const metadata = await conn.groupMetadata(m.chat);
      const participants = metadata?.participants || [];

      if (participants.length === 0) return m.reply("No hay participantes en este grupo.");

      const mentions = participants.map(p => p.id);
      let text = "👥 Mención a todos:\n\n";
      text += mentions.map(id => `@${id.split("@")[0]}`).join("\n");

      await conn.sendMessage(
        m.chat,
        { text, mentions },
        { quoted: m }
      );
    } catch (err) {
      console.error(err);
      m.reply("Ocurrió un error al intentar etiquetar a todos.");
    }
  },
};
