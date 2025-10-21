// Cosigo creado por China
// github.com/ittschinitaaa

const acrcloud = require("acrcloud");

module.exports = {
  command: ["whatmusic"],
  description: "Detecta el nombre de una canción a partir de un audio",
  category: "tools",
  run: async (client, m) => {
    if (!m.quoted || !/audio/.test(m.quoted.mimetype || "")) {
      return client.sendMessage(m.chat, { text: "🎧 Responde a un audio para reconocer la canción." }, { quoted: m });
    }

    try {
      const buffer = await m.quoted.download();
      const acr = new acrcloud({
        host: "identify-eu-west-1.acrcloud.com",
        access_key: "8b1e8d37f99cf1433e73",
        access_secret: "VEe0sjz9zEGtVYp2xWwVVRFX5V47k5xF8HcMrQqE"
      });

      const res = await acr.identify(buffer);
      const info = res?.metadata?.music?.[0];

      if (!info) {
        return client.sendMessage(m.chat, { text: "⚠️ No se pudo reconocer la canción." }, { quoted: m });
      }

      const { title, artists, album, release_date } = info;
      const msg = `🎵 *Canción Detectada*\n\n` +
        `> 🎧 *Título:* ${title}\n` +
        `> 👤 *Artista:* ${artists?.map(a => a.name).join(", ") || "Desconocido"}\n` +
        `> 💿 *Álbum:* ${album?.name || "Desconocido"}\n` +
        `> 🗓️ *Lanzamiento:* ${release_date || "Desconocido"}`;

      await client.sendMessage(m.chat, { text: msg }, { quoted: m });
    } catch (err) {
      console.error(err);
      client.sendMessage(m.chat, { text: "❌ Error al reconocer la canción." }, { quoted: m });
    }
  },
};
