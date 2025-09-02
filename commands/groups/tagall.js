// commands/groups/tagall.js
module.exports = {
  command: ["tagall", "todos", "invocar"],
  description: "Menciona a todos los miembros del grupo",
  category: "groups",
  isGroup: true,
  isAdmin: true,

  run: async (client, m, { text, participants, groupMetadata }) => {
    try {
      let mensaje = text ? text : "✨ Atención familia ✨"; 
      let users = participants.map(p => p.id);

      let texto = `
🌸 *Invocación en ${groupMetadata.subject}* 🌸  

📢 ${mensaje}

👥 *Participantes (${users.length}):*
${users.map(u => `➤ @${u.split("@")[0]}`).join("\n")}
      `.trim();

      await client.sendMessage(
        m.chat,
        { text: texto, mentions: users },
        { quoted: m }
      );
    } catch (e) {
      console.error(e);
      await m.reply("❌ Error al ejecutar el comando.");
    }
  },
};
