// codigo creado por china
// github: github.com/ittschinitaaa

module.exports = {
  command: ['todos', 'invocar', 'tagall'],
  description: 'Etiqueta a todos los miembros de un grupo con un mensaje opcional',
  category: 'groups',
  isGroup: true,
  isAdmin: true,
  botAdmin: true,
  use: '<mensaje opcional>',
  run: async (client, m, args) => {
    try {
      const groupMetadata = await client.groupMetadata(m.chat);
      const participants = groupMetadata.participants;

      // Emoji personalizado o por defecto
      const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '🍫';

      // React con el emoji
      if (client.relayMessage) m.react?.(customEmoji); // Si tu bot tiene m.react

      // Verificar permisos del usuario
      const senderIsAdmin = participants.find(p => p.id === m.sender)?.admin || false;
      const isOwner = global.owner.includes(m.sender.split('@')[0]);
      if (!senderIsAdmin && !isOwner) {
        return m.reply('❌ Solo administradores pueden usar este comando');
      }

      // Mensaje opcional
      const userMessage = args.join(' ') || '';
      const infoMsg = userMessage ? `*» INFO :* ${userMessage}` : '';
      let text = `*!  MENCION GENERAL  !*\n  *PARA ${participants.length} MIEMBROS* 🗣️\n\n${infoMsg}\n\n╭ ┄ 𝅄 ۪꒰ \`⡞᪲=͟͟͞${namebot} ≼᳞ׄ\` ꒱ ۟ 𝅄 ┄\n`;

      for (const member of participants) {
        text += `┊${customEmoji} @${member.id.split('@')[0]}\n`;
      }

      text += `╰⸼ ┄ ┄ ┄ ─ ꒰  ׅ୭ *${version}* ୧ ׅ ꒱ ┄ ─ ┄ ⸼`;

      // Enviar mensaje mencionando a todos
      await client.sendMessage(m.chat, { text, mentions: participants.map(p => p.id) });
    } catch (err) {
      console.error(err);
      m.reply('❌ Ocurrió un error al etiquetar a todos');
    }
  }
};
