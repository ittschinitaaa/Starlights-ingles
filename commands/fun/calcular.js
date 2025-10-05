// código creado por china
// github: github.com/ittschinitaaa
module.exports = {
  command: ['gay','lesbiana','pajero','pajera','puto','puta','manco','manca','rata','prostituta','prostituto'],
  description: 'Calcula el porcentaje divertido de un usuario',
  category: 'fun',
  isGroup: true,
  isAdmin: false,
  botAdmin: false,
  use: '(@tag o nombre)',
  run: async (client, m, args) => {
    if (!args[0] && !m.quoted) return m.reply('❀ Por favor, menciona a un usuario para comprobar su test.', m);

    let user = m.quoted ? m.quoted.sender : m.mentionedJid?.[0] || m.sender;
    let name = args.join(' ') || user.split('@')[0];

    let percentage = Math.floor(Math.random() * 101); // porcentaje 0-100
    let emoji = '';
    let description = '';

    switch (m.command) {
      case 'gay':
        emoji = '🏳️‍🌈';
        description = `💙 ${name.toUpperCase()} es *${percentage}%* Gay ${emoji}`;
        break;
      case 'lesbiana':
        emoji = '🏳️‍🌈';
        description = `💜 ${name.toUpperCase()} es *${percentage}%* Lesbiana ${emoji}`;
        break;
      case 'pajero':
      case 'pajera':
        emoji = '😏💦';
        description = `🧡 ${name.toUpperCase()} es *${percentage}%* ${m.command} ${emoji}`;
        break;
      case 'puto':
      case 'puta':
        emoji = '🔥🥵';
        description = `😻 ${name.toUpperCase()} es *${percentage}%* ${m.command} ${emoji}`;
        break;
      case 'manco':
      case 'manca':
        emoji = '💩';
        description = `🌟 ${name.toUpperCase()} es *${percentage}%* ${m.command} ${emoji}`;
        break;
      case 'rata':
        emoji = '🐁';
        description = `🐭 ${name.toUpperCase()} es *${percentage}%* ${m.command} ${emoji}`;
        break;
      case 'prostituto':
      case 'prostituta':
        emoji = '🫦👅';
        description = `❀ ${name.toUpperCase()} es *${percentage}%* ${m.command} ${emoji}`;
        break;
      default:
        return m.reply('🍭 Comando inválido.');
    }

    // Mensaje final con un toque de humor aleatorio
    const responses = [
      "El universo ha hablado.",
      "Los científicos lo confirman.",
      "¡Sorpresa!"
    ];
    const response = responses[Math.floor(Math.random() * responses.length)];

    await m.reply(`💫 *CALCULADORA* 💫\n\n${description}\n\n➤ ${response}`, { mentions: [user] });
  },
};
