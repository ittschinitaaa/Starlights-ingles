// código creado por china
// codigo creado por china
//github: github.com/ittschinitaaa

module.exports = {
  command: ["hug", "abrazar"],
  description: "Envía un abrazo a alguien",
  category: "anime",
  isGroup: true,
  isAdmin: false,
  botAdmin: false,
  use: "(@0 o responder a un mensaje)",
  run: async (client, m, args) => {
    let who = m.mentionedJid && m.mentionedJid.length > 0 ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
    let name = await client.getName(who);
    let name2 = await client.getName(m.sender);

    let str = m.mentionedJid && m.mentionedJid.length > 0 || m.quoted 
        ? `\`${name2}\` abrazo a \`${name || who}\` (づ˶•༝•˶)づ♡` 
        : `\`${name2}\` se abrazó a sí mismo/a (づ˶•༝•˶)づ♡`;

    if (m.isGroup) {
      const videos = [
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866775883.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866762669.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866810774.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866805671.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866790418.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866782428.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866769477.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866846247.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866839926.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866831885.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866829226.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742866817182.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745603436585.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745603441507.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745603433572.mp4'
      ];
      const video = videos[Math.floor(Math.random() * videos.length)];

      client.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, ptt: true, mentions: [who] }, { quoted: m });
    }
  },
};
