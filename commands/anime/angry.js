// código creado por china
// github.com/ittschinitaaa
module.exports = {
  command: ["angry", "enojado"],
  description: "Muestra un video de enojo dirigido a alguien o a ti mismo",
  category: "anime",
  isGroup: true,
  run: async (client, m, args) => {
    let who = m.mentionedJid && m.mentionedJid.length > 0
      ? m.mentionedJid[0]
      : m.quoted
        ? m.quoted.sender
        : m.sender;

    let nameSender = await client.getName(m.sender);
    let nameTarget = await client.getName(who);

    let str = (m.mentionedJid && m.mentionedJid.length > 0) || m.quoted
      ? `\`${nameSender}\` está enojado/a con \`${nameTarget}\` 凸ಠ益ಠ)凸`
      : `\`${nameSender}\` está enojado/a 凸ಠ益ಠ)凸`;

    if (m.isGroup) {
      const videos = [
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742786883573.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742786889338.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742786895614.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742786900963.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742786913602.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742786877462.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742786829620.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742786871042.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742786865577.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742786855746.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742786847500.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742786834604.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745594831851.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745594842569.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745594838212.mp4"
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
