// Comando creado por China
// github: github.com/ittschinitaaa

module.exports = {
  command: ["cal", "calc", "calcular", "calculadora"],
  description: "Calcula operaciones matemáticas básicas",
  category: "tools",
  isGroup: false,
  isAdmin: false,
  botAdmin: false,
  use: "<ecuación o responder a un mensaje>",
  exp: 5,

  run: async (client, m, args) => {
    try {
      const emoji = "🧮";
      let text = args.join(" ") || (m.quoted && m.quoted.text) || "";
      if (!text) return client.reply(m.chat, `${emoji} Ingresa la ecuación.\nSímbolos compatibles: -, +, *, /, ×, ÷, π, e, (, )`, m);

      let val = text
        .replace(/[^0-9\-\/+*×÷πEe()piPI/]/g, '')
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π|pi/gi, 'Math.PI')
        .replace(/e/gi, 'Math.E')
        .replace(/\/+/g, '/')
        .replace(/\++/g, '+')
        .replace(/-+/g, '-');

      let format = val
        .replace(/Math\.PI/g, 'π')
        .replace(/Math\.E/g, 'e')
        .replace(/\//g, '÷')
        .replace(/\*/g, '×');

      let result = (new Function('return ' + val))();
      if (result === undefined || result === null) throw new Error("Resultado indefinido");

      await m.react("🧮");
      await client.sendMessage(
        m.chat,
        { text: `✧ Resultado:\n\n*${format}* = _${result}_` },
        { quoted: m }
      );
    } catch (e) {
      console.error(e);
      await client.reply(
        m.chat,
        "❌ Formato incorrecto. Solo puedes usar números y símbolos: -, +, *, /, ×, ÷, π, e, (, )",
        m
      );
    }
  },
};
