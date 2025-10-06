// comando para obtener ID de canales
module.exports = {
  command: ["canalid", "channelid"],
  description: "Muestra el ID del canal donde se ejecuta",
  category: "general",
  isGroup: false, // los canales no son grupos
  isAdmin: false,
  botAdmin: false,

  run: async (client, m) => {
    try {
      // El ID del canal es m.chat
      const channelId = m.chat;
      const name = m.pushName || "Canal"; // nombre del canal o fallback
      await client.sendMessage(
        m.chat,
        { text: `🔹 Nombre: ${name}\n🔹 ID del canal: ${channelId}` },
        { quoted: m }
      );
    } catch (err) {
      console.error(err);
      await client.sendMessage(m.chat, { text: "❌ No se pudo obtener el ID del canal." }, { quoted: m });
    }
  },
};
