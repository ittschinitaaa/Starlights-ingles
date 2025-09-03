module.exports = {
  command: ["kickall"],
  description: "Elimina a todos los miembros del grupo (solo creador del bot)",
  category: "groups",
  isGroup: true,
  botAdmin: true,
  run: async (client, m) => {
    try {
      const botOwner = global.owner[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
      const botJid = client.decodeJid(client.user.id);

      if (m.sender !== botOwner) return m.reply(global.mess.owner);

      const group = await client.groupMetadata(m.chat);
      const participants = group.participants;

      const botParticipant = participants.find(p => p.id === botJid);
      const isBotAdmin = botParticipant?.admin === "admin" || botParticipant?.admin === "superadmin";

      if (!isBotAdmin) return m.reply("❌ Necesito ser admin del grupo para ejecutar este comando.");

      // Filtra a los miembros a eliminar (excluye bot, owner y admins)
      const toRemove = participants
        .filter(p => p.id !== botJid && p.id !== botOwner && !p.admin)
        .map(p => p.id);

      if (toRemove.length === 0) return m.reply("⚠️ No hay miembros que pueda eliminar (todos son admins o owner).");

      const mensajeKickAll = `⚠️ *ATENCIÓN MIEMBROS DEL GRUPO* ⚠️

🔥 Ha comenzado *La Purga* 🔥

> Durante este proceso, todos los integrantes serán eliminados.

⚠️ *Nadie está a salvo... excepto los administradores.*

> ⏳ La purga iniciará en breve...

Se eliminarán *${toRemove.length} usuarios...*`;

      await client.sendMessage(m.chat, {
        image: { url: "https://files.catbox.moe/sklz18.png" },
        caption: mensajeKickAll
      }, { quoted: m });

      // --- Proceso de eliminación ---
      for (let i = 0; i < toRemove.length; i++) {
        const user = toRemove[i];
        try {
          await client.groupParticipantsUpdate(m.chat, [user], "remove");
          await client.sendMessage(m.chat, {
            text: `⏳ Eliminado: @${user.split("@")[0]} (${i + 1}/${toRemove.length})`,
            mentions: [user]
          });
        } catch (err) {
          console.error(`No se pudo eliminar a ${user}:`, err);
        }
        await new Promise(r => setTimeout(r, 2500));
      }

      const mensajeFinal = `🕛 *La Purga ha terminado.*

🔥 *Los miembros fueron eliminados...*
> Se eliminaron *${toRemove.length}* miembros correctamente.`;

      await client.sendMessage(m.chat, { text: mensajeFinal }, { quoted: m });

    } catch (e) {
      console.error(e);
      m.reply("❌ No se pudo ejecutar el comando kickall.");
    }
  },
};

/*
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
        caption: `⚠️ *ATENCIÓN MIEMBROS DEL GRUPO* ⚠️\n\n🔥 Ha comenzado *\`La Purga`\* 🔥\n\n> Durante este proceso, todos los integrantes serán eliminados.\n\n⚠️ *Nadie está a salvo... excepto los administradores.*\n\n> ⏳ La purga iniciará en breve...\n\nSe eliminarán *${toRemove.length} usuarios...* `
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
        text: `🕛 *La Purga ha terminado.*\n\n🔥 *los miembros fueron eliminados...*\n> Se eliminaron *${toRemove.length}* miembros correctamente.`
      }, { quoted: m });

    } catch (e) {
      console.error(e);
      m.reply("❌ No se pudo ejecutar el comando kickall.");
    }
  },
};
*/
