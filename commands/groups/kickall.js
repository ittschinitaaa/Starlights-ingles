// commands/groups/kickall.js
module.exports = {
  command: ["kickall"],
  description: "Elimina a todos los miembros del grupo (solo creador del bot)",
  category: "groups",
  isGroup: true,
  botAdmin: true,
  run: async (client, m) => {
    try {
      const botOwner = global.owner[0][0] + "@s.whatsapp.net";
      if (m.sender !== botOwner) {
        return m.reply("❌ Solo el *creador del bot* puede usar este comando.");
      }

      const group = await client.groupMetadata(m.chat);
      const participants = group.participants.map(p => p.id);

      // Excluir al bot y al creador del bot
      const toRemove = participants.filter(
        id => id !== client.decodeJid(client.user.id) && id !== botOwner
      );

      if (toRemove.length === 0) {
        return m.reply("⚠️ No hay miembros que pueda eliminar.");
      }

      for (let user of toRemove) {
        await client.groupParticipantsUpdate(m.chat, [user], "remove");
        await new Promise(r => setTimeout(r, 1000)); // espera 1s entre expulsiones
      }

      m.reply(`✅ Se eliminaron *${toRemove.length}* miembros del grupo.`);
    } catch (e) {
      console.error(e);
      m.reply("❌ No se pudo ejecutar el comando kickall.");
    }
  },
};
