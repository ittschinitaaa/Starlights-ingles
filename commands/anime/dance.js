// código creado por china
// github: github.com/ittschinitaaa

module.exports = {
  command: ["dance", "bailar"],
  description: "Muestra que estás bailando con alguien o solo/a",
  category: "anime",
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

    let str = m.mentionedJid && m.mentionedJid.length > 0 || m.quoted 
        ? `\`${name2}\` está bailando con \`${name || who}\` (ﾉ^ヮ^)ﾉ*:・ﾟ✧` 
        : `\`${name2}\` está bailando (ﾉ^ヮ^)ﾉ*:・ﾟ✧`;

    if (m.isGroup) {
      const videos = [
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742861109065.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742861114581.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742861126777.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742861132832.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742861166366.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742861080414.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742861086066.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742861092077.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742861097581.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742861103401.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742861072821.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742861075934.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745602488814.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745602485955.mp4',
        'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745602477517.mp4'
      ];
      const video = videos[Math.floor(Math.random() * videos.length)];

      await client.sendMessage(
        m.chat,
        { video: { url: video }, gifPlayback: true, caption: str, ptt: true, mentions: [who] },
        { quoted: m }
      );
    }
  },
};
