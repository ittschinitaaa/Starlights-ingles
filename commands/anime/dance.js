// código creado por china
// github: github.com/ittschinitaaa

module.exports = {
  command: ["dance", "bailar"],
  description: "Muestra que estás bailando con alguien o solo/a",
  category: "anime",
  isGroup: true,
  isAdmin: false,
  botAdmin: false,
  use: "(@0 o responder a un mensaje)",
  run: async (client, m, args) => {
    try {
      // Determinar el usuario objetivo
      const who = m.mentionedJid && m.mentionedJid.length > 0
        ? m.mentionedJid[0]
        : m.quoted
        ? m.quoted.sender
        : m.sender;

      // Función segura para obtener nombre
      const getName = async (jid) => {
        try {
          const contact = await client.onWhatsApp(jid);
          return contact?.[0]?.notify || contact?.[0]?.vname || contact?.[0]?.jid?.split('@')[0] || jid;
        } catch {
          return jid.split('@')[0];
        }
      };

      const name = await getName(who);
      const name2 = await getName(m.sender);

      // Frase
      const str =
        (m.mentionedJid && m.mentionedJid.length > 0) || m.quoted
          ? `\`${name2}\` está bailando con \`${name}\` (ﾉ^ヮ^)ﾉ*:・ﾟ✧`
          : `\`${name2}\` está bailando (ﾉ^ヮ^)ﾉ*:・ﾟ✧`;

      // Videos aleatorios
      const videos = [
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742861109065.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742861114581.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742861126777.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742861132832.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742861166366.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742861080414.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742861086066.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742861092077.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742861097581.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742861103401.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742861072821.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742861075934.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745602488814.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745602485955.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745602477517.mp4'
      ];

      const video = videos[Math.floor(Math.random() * videos.length)];

      // Enviar video
      await client.sendMessage(
        m.chat,
        { video: { url: video }, gifPlayback: true, caption: str, mentions: [who] },
        { quoted: m }
      );

    } catch (err) {
      console.error("Error en comando dance:", err);
      return m.reply("❌ Hubo un error ejecutando el comando. Inténtalo de nuevo.");
    }
  },
};
