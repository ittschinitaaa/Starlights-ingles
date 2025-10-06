// código creado por china
// github: github.com/ittschinitaaa

module.exports = {
  command: ["hello", "hola"],
  description: "Saluda a alguien en el grupo",
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

      // Función segura para obtener nombre (adaptada a Starlights)
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

      // Reacción
      if (m.react) m.react('👋');

      // Mensaje de saludo
      let str;
      if (m.mentionedJid && m.mentionedJid.length > 0) {
        str = `\`${name2}\` *hola* \`${name}\` *¿cómo estás?*`;
      } else if (m.quoted) {
        str = `\`${name2}\` *hola* \`${name}\` *¿cómo te encuentras hoy?*`;
      } else {
        str = `\`${name2}\` *saluda a todos los integrantes del grupo, ¿cómo se encuentran?*`;
      }

      // Lista de videos
      const videos = [
        'https://qu.ax/EcRBE.mp4',
        'https://qu.ax/oARle.mp4',
        'https://qu.ax/eQXQh.mp4',
        'https://qu.ax/ddLrC.mp4',
        'https://qu.ax/oalOG.mp4',
        'https://qu.ax/nYJ.mp4',
        'https://qu.ax/bkcz.mp4',
        'https://qu.ax/oARle.mp4'
      ];

      // Selección aleatoria
      const video = videos[Math.floor(Math.random() * videos.length)];

      // Enviar mensaje
      await client.sendMessage(
        m.chat,
        { video: { url: video }, gifPlayback: true, caption: str, mentions: [who] },
        { quoted: m }
      );

    } catch (err) {
      console.error("Error en comando hello:", err);
      return m.reply("❌ Hubo un error ejecutando el comando. Inténtalo de nuevo.");
    }
  },
};
