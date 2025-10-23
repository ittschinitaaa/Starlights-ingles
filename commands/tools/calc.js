module.exports = {
  command: ["cal", "calc", "calcular", "calculadora"],
  description: "Calculate basic mathematical operations",
  category: "tools",
  isGroup: false,
  isAdmin: false,
  botAdmin: false,
  use: "<equation or reply to a message>",
  exp: 5,

  run: async (client, m, args) => {
    try {
      const emoji = "🧮";
      let text = args.join(" ") || (m.quoted && m.quoted.text) || "";
      if (!text) return client.reply(m.chat, `${emoji} Enter the equation.\nSupported symbols: -, +, *, /, ×, ÷, π, e, (, )`, m);

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
      if (result === undefined || result === null) throw new Error("Indefinite result");

      await m.react("🧮");
      await client.sendMessage(
        m.chat,
        { text: `✧ Result:\n\n*${format}* = _${result}_` },
        { quoted: m }
      );
    } catch (e) {
      console.error(e);
      await client.reply(
        m.chat,
        "❌ Incorrect format. You can only use numbers and symbols: -, +, *, /, ×, ÷, π, e, (, )",
        m
      );
    }
  },
};
