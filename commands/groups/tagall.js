module.exports = {
  name: "tagall",
  category: "groups",
  isGroup: true,
  botAdmin: true,
  run: async (conn, m, args) => {
    if (!m.isGroup) return m.reply("Este comando solo funciona en grupos");

    const metadata = await conn.groupMetadata(m.chat);
    const participants = metadata.participants || [];

    let text = "👥 Mención a todos:\n\n";
    const mentions = participants.map(p => p.id);

    text += mentions.map(id => `@${id.split("@")[0]}`).join("\n");

    await conn.sendMessage(
      m.chat,
      { text, mentions },
      { quoted: m }
    );
  },
};
