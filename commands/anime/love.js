// código creado por China
// github: github.com/ittschinitaaa

module.exports = {
  command: ["love", "amor", "enamorada"],
  description: "Muestra que estás enamorad@ de alguien",
  category: "anime",
  isGroup: true,
  isAdmin: false,
  botAdmin: false,
  use: "(@usuario o responder a un mensaje)",

  run: async (client, m, args) => {
    try {
      // --- detección de usuario objetivo ---
      const who = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : m.sender);

      // --- función segura para obtener nombres ---
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

      // --- texto principal ---
      const str =
        m.mentionedJid?.length > 0 || m.quoted
          ? `💞 \`${name2}\` *está enamorad@ de* \`${name}\` 💖`
          : `💞 \`${name2}\` *está enamorad@* 💗`;

      // --- lista de videos ---
      const videos = [
        "https://telegra.ph/file/5fbd60c40ab190ecc8e1c.mp4",
        "https://telegra.ph/file/ca30d358d292674698b40.mp4",
        "https://telegra.ph/file/25f88386dd7d4d6df36fa.mp4",
        "https://telegra.ph/file/eb63131df0de6b47c7ab7.mp4",
        "https://telegra.ph/file/209990ee46c645506a5fc.mp4",
        "https://telegra.ph/file/440f276fcbb2d04cbf1d1.mp4",
        "https://telegra.ph/file/42cea67d9b013ed9a9cd0.mp4",
        "https://telegra.ph/file/bc0f47b8f3fb9470bc918.mp4",
        "https://telegra.ph/file/79ae875090b64ab247b7a.mp4",
      ];

      const video = videos[Math.floor(Math.random() * videos.length)];

      // --- enviar mensaje ---
      await m.react("💖");
      await client.sendMessage(
        m.chat,
        { video: { url: video }, gifPlayback: true, caption: str, mentions: [who] },
        { quoted: m }
      );
    } catch (err) {
      console.error(err);
      await client.reply(m.chat, "❌ Error al ejecutar el comando *love*.", m);
    }
  },
};
