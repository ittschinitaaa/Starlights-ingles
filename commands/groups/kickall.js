// commands/groups/kickall.js
module.exports = {
  command: ["kickall"],
  description: "Elimina a todos los miembros del grupo (solo creador del bot)",
  category: "groups",
  isGroup: true,
  botAdmin: true,
  run: async (client, m) => {
    try {
      // --- Ajuste para tu config.js ---
      const botOwner = global.owner[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";

      if (m.sender !== botOwner) {
        return m.reply(global.mess.owner);
      }

      const group = await client.groupMetadata(m.chat);
      const participants = group.participants.map(p => p.id);

      // Excluir al bot y al owner del bot
      const toRemove = participants.filter(
        id => id !== client.decodeJid(client.user.id) && id !== botOwner
      );

      if (toRemove.length === 0) {
        return m.reply("⚠️ No hay miembros que pueda eliminar.");
      }

      // --- ⚠️ Mensaje inicial con tu imagen ---
      await client.sendMessage(m.chat, {
        image: { url: "https://files.catbox.moe/sklz18.png" }, // 🔥 pon tu imagen aquí
        caption: `🚨 *ATENCIÓN GRUPO* 🚨\n\nEl creador activó *kickall*.\n\nSe eliminarán *${toRemove.length}* miembros...`
      }, { quoted: m });

      // --- Proceso de eliminación con solo texto ---
      for (let i = 0; i < toRemove.length; i++) {
        let user = toRemove[i];
        await client.groupParticipantsUpdate(m.chat, [user], "remove");

        await client.sendMessage(m.chat, {
          text: `⏳ Eliminado: @${user.split("@")[0]} (${i+1}/${toRemove.length})`,
          mentions: [user]
        });

        await new Promise(r => setTimeout(r, 1500)); // delay entre expulsiones
      }

      // --- Mensaje final solo texto ---
      await client.sendMessage(m.chat, {
        text: `✅ *Kickall completado*\n\nSe eliminaron *${toRemove.length}* miembros correctamente.`
      }, { quoted: m });

    } catch (e) {
      console.error(e);
      m.reply("❌ No se pudo ejecutar el comando kickall.");
    }
  },
};
