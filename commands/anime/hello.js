// código creado por china
// github: github.com/ittschinitaaa

module.exports = {
  command: ["hello", "hola"],
  description: "Saluda a alguien en el grupo",
  category: "fun",
  isGroup: true,
  isAdmin: false,
  botAdmin: false,
  use: "(@0 o responder a un mensaje)",
  run: async (client, m, args) => {
    let who = m.mentionedJid && m.mentionedJid.length > 0 
              ? m.mentionedJid[0] 
              : m.quoted 
                ? m.quoted.sender 
                : m.sender;

    let name = await client.getName(who);
    let name2 = await client.getName(m.sender);

    // Reacción al mensaje
    m.react('👋');

    let str;
    if (m.mentionedJid && m.mentionedJid.length > 0) {
      str = `\`${name2}\` *hola* \`${name || who}\` *como estas?.*`;
    } else if (m.quoted) {
      str = `\`${name2}\` *hola* \`${name || who}\` *como te encuentras hoy?.*`;
    } else {
      str = `\`${name2}\` *saluda a todos los integrantes del grupo, como se encuentran?*`.trim();
    }

    if (m.isGroup) {
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
      const video = videos[Math.floor(Math.random() * videos.length)];

      await client.sendMessage(
        m.chat,
        { video: { url: video }, gifPlayback: true, caption: str, mentions: [who] },
        { quoted: m }
      );
    }
  },
};
