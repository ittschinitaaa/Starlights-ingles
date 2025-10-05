// código creado por china
// github.com/ittschinitaaa
module.exports = {
  command: ["happy", "feliz"],
  description: "Muestra un video de felicidad dirigido a alguien o a ti mismo",
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
      ? `\`${nameSender}\` está feliz por \`${nameTarget}\` ٩(˶ˆᗜˆ˵)و`
      : `\`${nameSender}\` está feliz ٩(˶ˆᗜˆ˵)و`;

    if (m.isGroup) {
      const videos = [
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742865594703.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742865585197.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742865626162.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742865629570.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742865615508.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742865606355.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742865601294.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742865789327.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742865670953.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742865663383.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742865653527.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742865637437.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745603272484.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745603276572.mp4",
        "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745603266683.mp4"
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
