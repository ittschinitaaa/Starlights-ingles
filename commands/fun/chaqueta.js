// codigo creador por china
// github: github.com/ittschinitaaa
module.exports = {
  command: ["jalame", "jalamela", "chaqueteame", "chaqueta"],
  description: "Hace una chaqueta divertida entre usuarios",
  category: "fun",
  isGroup: true,
  isAdmin: false,
  botAdmin: false,
  use: "(@0 o responder a un mensaje)",
  run: async (client, m, args) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid?.[0] || m.fromMe ? client.user.jid : m.sender;
    let emoji = "🔥";

    let chaqueta = [
      `${emoji} Iniciando chaqueta...`,
      '╭━━╮╭╭╭╮\n┃▔╲┣╈╈╈╈━━━╮\n┃┈┈▏.╰╯╯╯╭╮━┫\n┃┈--.╭━━━━╈╈━╯\n╰━━╯-.                ╰╯',
      `*[ 🔥 ] @${m.sender.split('@')[0]} SE HA CORRIDO GRACIAS A @${who.split('@')[0]} EN STARLIGHTS.*`,
    ];

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // enviar cada mensaje con delay
    for (let text of chaqueta) {
      await m.reply(text, null, { mentions: [m.sender, who] });
      await delay(1500);
    }
  },
};
