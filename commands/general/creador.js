// commands/info/creador.js
module.exports = {
  command: ["creador", "owner"],
  description: "Muestra la información del creador de manera linda",
  category: "info",
  isGroup: false,
  run: async (client, m, args) => {
    try {
      // Foto del creador (puedes poner un enlace a su foto real)
      const fotoCreador = "https://files.catbox.moe/sklz18.png;

      // Texto bonito con emojis
      let mensaje = `👑 *Conoce al Creador del Bot*\n\n`;
      mensaje += `✨ Nombre: Mía "Chinita"\n`;
      mensaje += `📱 WhatsApp: +92 325 6941884\n`;
      mensaje += `🌎 País: Argentina\n`;
      mensaje += `💌 Bio: "Siempre creando cosas lindas para mis bots 😸"\n\n`;
      mensaje += `🔹 Presiona los botones para contactarme o ver mi Instagram.`;

      // Botones interactivos tipo URL
      const buttons = [
        {
          url: "https://wa.me/923256941884", // tu número de WhatsApp
          displayText: "📩 Contactarme",
          type: 1
        },
        {
          url: "https://www.instagram.com/its.chinitaaa_", // tu Instagram
          displayText: "ℹ️ Mi Instagram",
          type: 1
        }
      ];

      // Enviar mensaje con foto y botones
      await client.sendMessage(m.chat, {
        image: { url: fotoCreador },
        caption: mensaje,
        footer: "✨ 𝐒𝐭𝐚𝐫𝐥𝐢𝐠𝐡𝐭𝐬 ✨",
        templateButtons: buttons,
        headerType: 4
      }, { quoted: m });

    } catch (e) {
      console.error(e);
      m.reply("❌ No se pudo mostrar la información del creador");
    }
  },
};
