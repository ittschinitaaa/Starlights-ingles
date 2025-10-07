// código creado por china
// github.com/ittschinitaaa
const crypto = require("crypto");

module.exports = {
  command: ["code"],
  description: "Genera un código de vinculación para crear un sub-bot",
  category: "jadibot",
  isPrivate: false,
  isGroup: false,
  run: async (client, m) => {
    // Generar un código aleatorio de 8 dígitos
    const code = Math.floor(10000000 + Math.random() * 90000000).toString();

    // Guardar el código temporal en memoria global
    if (!global.subbotCodes) global.subbotCodes = {};
    global.subbotCodes[code] = {
      owner: m.sender,
      expires: Date.now() + 2 * 60 * 1000 // dura 2 minutos
    };

    const mensaje = `🌟 *Código de Vinculación:*\n\n> ${code}\n\n` +
    `📱 Usa este código en otro WhatsApp para conectarlo como *SubBot* de Starlights.\n` +
    `⏳ Expira en 2 minutos.`;

    await client.sendMessage(m.chat, { text: mensaje }, { quoted: m });
  },
};
