// commands/subbot.js
const { startSubBot } = require("../lib/subbot.js");

module.exports = {
  command: ["code", "qr"],
  description: "Genera un sub-bot temporal usando QR o código de emparejamiento",
  category: "subbot",
  isGroup: false,
  isAdmin: false,
  botAdmin: false,
  use: "#code para QR, #code pairing para código de emparejamiento",
  run: async (client, m, args) => {
    try {
      // Detecta si el usuario quiere pairing code
      const usePairing = args[0]?.toLowerCase() === "pairing" ? true : false;

      await startSubBot(client, m, usePairing);

    } catch (err) {
      console.error(err);
      m.reply("❌ Ocurrió un error al generar tu sub-bot. Intenta nuevamente.");
    }
  },
};
