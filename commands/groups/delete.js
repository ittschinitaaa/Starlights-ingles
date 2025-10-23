// código creado por china
// github: github.com/ittschinitaaa

module.exports = {
  command: ['del', 'delete'],
  description: 'Delete a quoted message in the chat',
  category: 'groups',
  isGroup: false,
  isAdmin: true,
  botAdmin: true,
  use: 'reply to the message to delete',
  run: async (client, m) => {
    try {
      if (!m.quoted) {
        return client.sendMessage(m.chat, { text: '❌ Please quote the message you want to delete..' }, { quoted: m });
      }

      // Obtener datos del mensaje citado
      const delet = m.message.extendedTextMessage?.contextInfo?.participant;
      const stanzaId = m.message.extendedTextMessage?.contextInfo?.stanzaId;

      if (stanzaId && delet) {
        // Eliminar mensaje citado de otro usuario
        await client.sendMessage(m.chat, {
          delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: stanzaId,
            participant: delet
          }
        });
      } else {
        // Enviar error si no se pudo obtener la info
        await client.sendMessage(m.chat, { delete: m.quoted.vM?.key });
      }
    } catch (err) {
      console.error(err);
      await client.sendMessage(m.chat, { text: '❌ The message could not be deleted. Make sure I m an admin...' }, { quoted: m });
    }
  }
};
