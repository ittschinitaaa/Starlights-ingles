// commands/groups/admins-lindo.js
module.exports = {
  command: ["admins", "adminlist", "admines"],
  description: "Muestra todos los administradores del grupo de manera linda",
  category: "groups",
  isGroup: true,

  run: async (client, m, { participants, groupMetadata }) => {
    try {
      let admins = participants.filter(p => p.admin !== null);
      if (admins.length === 0) return m.reply("❌ No hay administradores en este grupo.");

      // URL de una imagen bonita para encabezado
      const banner = "https://files.catbox.moe/sklz18.png"; // Cambia por tu imagen favorita

      // Texto decorado
      let texto = `🌟✨ *Administradores del Grupo* ✨🌟\n\n`;
      texto += `🏷️ Nombre del grupo: *${groupMetadata.subject}*\n`;
      texto += `👥 Total admins: ${admins.length}\n\n`;
      admins.forEach((admin, i) => {
        texto += `👑 ${i + 1}. @${admin.id.split("@")[0]}\n`;
      });
      texto += `\n🌸 Gracias a todos los admins por mantener el grupo seguro 💖`;

      // Enviar mensaje con imagen y menciones
      await client.sendMessage(m.chat, {
        image: { url: banner },
        caption: texto,
        mentions: admins.map(a => a.id)
      }, { quoted: m });

    } catch (e) {
      console.error(e);
      await m.reply("❌ Error al mostrar los administradores.");
    }
  }
};
