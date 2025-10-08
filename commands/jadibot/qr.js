// código creado por china
// github.com/ittschinitaaa
// comando: #qr — genera un código QR real para conectar un sub-bot

const { startSubBot } = require("../../lib/subbot");

module.exports = {
  command: ["qr", "connectqr"],
  description: "Genera un código QR para conectar un sub-bot",
  category: "subbots",
  isGroup: false,

  run: async (client, m, args) => {
    try {
      const number = m.sender.split("@")[0];

      await m.reply("🌀 *Generando código QR...*");

      await startSubBot(number, async (qrImage) => {
        await client.sendMessage(m.chat, {
          image: qrImage,
          caption: "📱 *Escanea este QR en WhatsApp Web* para conectar tu sub-bot.",
        });
      }, true);
    } catch (e) {
      console.error(e);
      await m.reply("❌ Error al generar el código QR de conexión.");
    }
  },
};
