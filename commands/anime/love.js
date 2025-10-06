// código creado por China
// github: github.com/ittschinitaaa

module.exports = {
  command: ["love", "amor", "enamorada"],
  description: "Muestra que estás enamorad﹫ de alguien 💞",
  category: "anime",
  isGroup: true,
  isAdmin: false,
  botAdmin: false,
  use: "(@usuario o responder a un mensaje)",

  run: async (client, m, args) => {
    try {
      let who = m.mentionedJid && m.mentionedJid.length > 0
        ? m.mentionedJid[0]
        : m.quoted
          ? m.quoted.sender
          : m.sender;

      let name = await client.getName(who);
      let name2 = await client.getName(m.sender);

      // Reacción
      await m.react('💘');

      let frases = [
        `💞 \`${name2}\` *está completamente enamorad﹫ de* \`${name || who}\` 💖`,
        `💓 \`${name2}\` *no puede dejar de pensar en* \`${name || who}\` (⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)`,
        `💗 \`${name2}\` *tiene mariposas en el estómago por* \`${name || who}\` 🦋`,
        `💕 \`${name2}\` *está perdidamente enamorad﹫ de* \`${name || who}\` 💫`,
        `💘 \`${name2}\` *está enamorad﹫ y se nota en su mirada* ✨`
      ];

      let str;
      if (m.mentionedJid && m.mentionedJid.length > 0 || m.quoted) {
        str = frases[Math.floor(Math.random() * frases.length)];
      } else {
        str = `💗 \`${name2}\` *está enamorad﹫ y no quiere decir de quién...* (≧◡≦)`;
      }

      const videos = [
        'https://telegra.ph/file/5fbd60c40ab190ecc8e1c.mp4',
        'https://telegra.ph/file/ca30d358d292674698b40.mp4',
        'https://telegra.ph/file/25f88386dd7d4d6df36fa.mp4',
        'https://telegra.ph/file/eb63131df0de6b47c7ab7.mp4',
        'https://telegra.ph/file/209990ee46c645506a5fc.mp4',
        'https://telegra.ph/file/440f276fcbb2d04cbf1d1.mp4',
        'https://telegra.ph/file/42cea67d9b013ed9a9cd0.mp4',
        'https://telegra.ph/file/bc0f47b8f3fb9470bc918.mp4',
        'https://telegra.ph/file/79ae875090b64ab247b7a.mp4'
      ];

      const video = videos[Math.floor(Math.random() * videos.length)];

      await client.sendMessage(
        m.chat,
        {
          video: { url: video },
          gifPlayback: true,
          caption: str,
          mentions: [who]
        },
        { quoted: m }
      );

    } catch (e) {
      console.error(e);
      await client.reply(m.chat, "❌ Hubo un error al ejecutar el comando *love*.", m);
    }
  },
};
