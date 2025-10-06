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
      // --- detección del usuario objetivo ---
      const who = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : m.sender);

      // --- obtener nombres seguros ---
      const getDisplayName = async (jid) => {
        try {
          const contact = await client.onWhatsApp(jid);
          if (contact && contact[0]?.notify) return contact[0].notify;
          const info = await client.fetchStatus(jid).catch(() => null);
          if (info?.status) return info.status;
          return jid.split("@")[0];
        } catch {
          return jid.split("@")[0];
        }
      };

      const name = await getDisplayName(who);
      const name2 = await getDisplayName(m.sender);

      // --- mensaje base ---
      const str =
        m.mentionedJid?.length > 0 || m.quoted
          ? `💋 \`${name2}\` besó a \`${name}\` ( ˘ ³˘)♥`
          : `💋 \`${name2}\` se besó a sí mism@ ( ˘ ³˘)♥`;

      // --- lista de videos ---
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
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745784914086.mp4",
      ];

      const randomVideo = videos[Math.floor(Math.random() * videos.length)];

      // --- enviar reacción y mensaje ---
      await m.react("💋");
      await client.sendMessage(
        m.chat,
        {
          video: { url: randomVideo },
          gifPlayback: true,
          caption: str,
          mentions: [who],
        },
        { quoted: m }
      );
    } catch (e) {
      console.error(e);
      await client.reply(m.chat, "❌ Error al ejecutar el comando *kiss*.", m);
    }
  },
};
