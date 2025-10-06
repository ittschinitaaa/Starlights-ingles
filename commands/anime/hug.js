// código creado por china
// github: github.com/ittschinitaaa

module.exports = {
  command: ["hug", "abrazar"],
  description: "Envía un abrazo a alguien",
  category: "anime",
  isGroup: true,
  isAdmin: false,
  botAdmin: false,
  use: "(@0 o responder a un mensaje)",
  run: async (client, m, args) => {
    try {
      // Detectar a quién se abraza
      const who = m.mentionedJid && m.mentionedJid.length > 0
        ? m.mentionedJid[0]
        : m.quoted
        ? m.quoted.sender
        : m.sender;

      // Función segura para obtener nombres (compatible con Starlights)
      const getName = async (jid) => {
        try {
          const contact = await client.onWhatsApp(jid);
          return (
            contact?.[0]?.notify ||
            contact?.[0]?.vname ||
            contact?.[0]?.jid?.split("@")[0] ||
            jid
          );
        } catch {
          return jid.split("@")[0];
        }
      };

      const name = await getName(who);
      const name2 = await getName(m.sender);

      // Texto del mensaje
      const str =
        m.mentionedJid && m.mentionedJid.length > 0 || m.quoted
          ? `\`${name2}\` abrazó a \`${name}\` (づ˶•༝•˶)づ♡`
          : `\`${name2}\` se abrazó a sí mismo/a (づ˶•༝•˶)づ♡`;

      // Reacción opcional
      if (m.react) m.react("🤗");

      // Lista de videos
      const videos = [
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866775883.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866762669.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866810774.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866805671.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866790418.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866782428.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866769477.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866846247.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866839926.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866831885.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866829226.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866817182.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745603436585.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745603441507.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745603433572.mp4'
      ];

      // Seleccionar uno al azar
      const video = videos[Math.floor(Math.random() * videos.length)];

      // Enviar mensaje
      await client.sendMessage(
        m.chat,
        { video: { url: video }, gifPlayback: true, caption: str, mentions: [who] },
        { quoted: m }
      );
    } catch (err) {
      console.error("Error en comando hug:", err);
      return m.reply("❌ Hubo un error al ejecutar el comando de abrazo.");
    }
  },
};
