// código creado por China
// github: github.com/ittschinitaaa

module.exports = {
  command: ["kiss", "besar"],
  description: "Besa a otro usuario con ternura ( ˘ ³˘)♥",
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

      // Reacción al mensaje
      await m.react('💋');

      let str =
        m.mentionedJid && m.mentionedJid.length > 0 || m.quoted
          ? `💋 \`${name2}\` besó a \`${name || who}\` ( ˘ ³˘)♥`
          : `💋 \`${name2}\` se besó a sí mismo/a ( ˘ ³˘)♥`;

      const videos = [
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745784879173.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745784874988.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745784869583.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745784864195.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745784856547.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745784908581.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745784904437.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745784899621.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745784894649.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745784889479.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745784945508.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745784940220.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745784935466.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745784918972.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745784914086.mp4"
      ];

      const randomVideo = videos[Math.floor(Math.random() * videos.length)];

      await client.sendMessage(
        m.chat,
        {
          video: { url: randomVideo },
          gifPlayback: true,
          caption: str,
          mentions: [who]
        },
        { quoted: m }
      );
    } catch (error) {
      console.error("Error en el comando kiss:", error);
      await client.reply(m.chat, "⚠️ Ocurrió un error al ejecutar el comando.", m);
    }
  },
};
