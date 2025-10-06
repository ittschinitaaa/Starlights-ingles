// código creado por China
// github: github.com/ittschinitaaa

module.exports = {
  command: ["inspect", "inspeccionar"],
  description: "Inspecciona un canal de WhatsApp (solo canales, no grupos)",
  category: "info",
  isGroup: false,
  isAdmin: false,
  botAdmin: false,
  use: "<enlace de canal>",

  run: async (client, m, args) => {
    try {
      if (!args[0]) return client.reply(m.chat, "✧ Ingresa un enlace de canal válido.", m);
      
      const channelUrl = args[0];

      // Intentar obtener metadata del canal
      const channelInfo = await client.newsletterMetadata("invite", channelUrl).catch(() => null);
      if (!channelInfo) return client.reply(m.chat, "⚠︎ No se encontró información del canal.", m);

      // Preparar texto del mensaje
      const str = `*📰 Información del Canal:*\n\n` +
        `• Nombre: ${channelInfo.name || "Desconocido"}\n` +
        `• Descripción: ${channelInfo.desc || "Sin descripción"}\n` +
        `• Participantes: ${channelInfo.size || "Desconocido"}\n` +
        `• Link: ${channelUrl}`;

      // Thumbnail del canal si existe
      const thumb = channelInfo.preview ? { url: channelInfo.preview } : null;

      // Enviar mensaje
      await client.sendMessage(
        m.chat,
        { 
          text: str, 
          contextInfo: {
            externalAdReply: {
              title: "Inspector de Canales",
              body: "✧ Solo canales, nada de grupos",
              thumbnailUrl: thumb?.url,
              sourceUrl: channelUrl
            }
          } 
        },
        { quoted: m }
      );

    } catch (err) {
      console.error(err);
      await client.reply(m.chat, "❌ Ocurrió un error al inspeccionar el canal.", m);
    }
  },
};
