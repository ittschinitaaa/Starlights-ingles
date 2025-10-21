// comando adaptado a Starlights por Chinita 🌙
// GitHub: github.com/ittschinitaaa

const handler = {
  command: ["coffee", "cafe", "café"],
  description: "Envía un video de anime tomando café ☕",
  category: "anime",

  run: async (client, m, args) => {
    const who = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : m.sender);
    const name = await client.getName(who);
    const name2 = await client.getName(m.sender);

    const caption =
      m.mentionedJid.length > 0 || m.quoted
        ? `\`${name2}\` está tomando café con \`${name || who}\` ٩(●ᴗ●)۶`
        : `\`${name2}\` está tomando café ٩(●ᴗ●)۶`;

    const videos = [
      "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742852595681.mp4",
      "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742852590440.mp4",
      "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742852622256.mp4",
      "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742852615392.mp4",
      "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742852609687.mp4",
      "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742852604742.mp4",
      "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742852600708.mp4",
      "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742852648100.mp4",
      "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742852643540.mp4",
      "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742852637625.mp4",
      "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742852632237.mp4",
      "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742852626590.mp4",
      "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745601869632.mp4",
      "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745601874216.mp4",
      "https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745601878415.mp4",
    ];

    const video = videos[Math.floor(Math.random() * videos.length)];

    await client.sendMessage(
      m.chat,
      {
        video: { url: video },
        gifPlayback: true,
        caption,
        mentions: [who],
      },
      { quoted: m }
    );
  },
};

module.exports = handler;
