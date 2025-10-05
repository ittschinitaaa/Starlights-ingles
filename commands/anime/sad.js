// código creado por china
// github.com/ittschinitaaa
module.exports = {
  command: ["sad", "triste"],
  description: "Muestra un video de tristeza dirigido a alguien o a ti mismo",
  category: "fun",
  isGroup: true,
  run: async (client, m, args) => {
    let who = (m.mentionedJid && m.mentionedJid.length > 0)
      ? m.mentionedJid[0]
      : m.quoted
        ? m.quoted.sender
        : m.sender;

    let nameSender = await client.getName(m.sender);
    let nameTarget = await client.getName(who);

    let str = (m.mentionedJid && m.mentionedJid.length > 0) || m.quoted
      ? `\`${nameSender}\` *está triste por* \`${nameTarget || who}\`.`
      : `\`${nameSender}\` *está muy triste.*`;

    if (m.isGroup) {
      const videos = [
        'https://telegra.ph/file/9c69837650993b40113dc.mp4',
        'https://telegra.ph/file/071f2b8d26bca81578dd0.mp4',
        'https://telegra.ph/file/0af82e78c57f7178a333b.mp4',
        'https://telegra.ph/file/8fb8739072537a63f8aee.mp4',
        'https://telegra.ph/file/4f81cb97f31ce497c3a81.mp4',
        'https://telegra.ph/file/6d626e72747e0c71eb920.mp4',
        'https://telegra.ph/file/8fd1816d52cf402694435.mp4',
        'https://telegra.ph/file/3e940fb5e2b2277dc754b.mp4'
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
