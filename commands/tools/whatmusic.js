// Cosigo creado por China
// github.com/ittschinitaaa

const acrcloud from "acrcloud";
const fetch from "node-fetch";

const acr = new acrcloud({
  host: "identify-ap-southeast-1.acrcloud.com",
  access_key: "ee1b81b47cf98cd73a0072a761558ab1",
  access_secret: "ya9OPe8onFAnNkyf9xMTK8qRyMGmsghfuHrIMmUI"
});

export default {
  command: ["whatmusic", "shazam"],
  description: "Detecta el nombre de una canción a partir de un audio o video.",
  category: "tools",
  group: true,
  run: async (client, m, args, { prefix }) => {
    const q = m.quoted ? m.quoted : m;

    if (!q.mimetype || (!q.mimetype.includes("audio") && !q.mimetype.includes("video"))) {
      return m.reply("🌱 Por favor, responde al audio o video del cual deseas buscar el título.");
    }

    const buffer = await q.download();
    try {
      await m.react("🕒");
      const data = await identificarCancion(buffer);

      if (!data.length) {
        await m.react("❌");
        return m.reply("☘️ No se encontraron resultados de la canción.");
      }

      let caption = "💿 *STᴀʀʟɪɢʜᴛꜱ - SHAZAM*\n\n";
      for (let result of data) {
        const enlaces = Array.isArray(result.url) ? result.url.filter(x => x) : [];
        caption += `🎵 *Título:* ${result.title}\n`;
        caption += `👤 *Artista:* ${result.artist}\n`;
        caption += `⏱️ *Duración:* ${result.duration}\n`;
        if (enlaces.length) caption += `🔗 *Enlaces:* ${enlaces.join("\n")}\n`;
        caption += `──────────────────────\n`;
      }

      await client.sendMessage(m.chat, {
        text: caption,
        contextInfo: {
          externalAdReply: {
            title: "✨ Identificación Musical",
            body: "Sistema Shazam • Starlights",
            mediaType: 1,
            renderLargerThumbnail: true,
            thumbnail: await (await fetch("https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742781294508.jpeg")).arrayBuffer(),
            sourceUrl: "https://github.com/ittschinitaaa"
          }
        }
      }, { quoted: m });

      await m.react("✅");

    } catch (err) {
      await m.react("❌");
      m.reply(`⚠️ Se ha producido un problema.\n> Usa *${prefix}report* para informarlo.\n\n${err.message}`);
    }
  }
};

async function identificarCancion(buffer) {
  const res = await acr.identify(buffer);
  const data = res?.metadata;
  if (!data || !Array.isArray(data.music)) return [];

  return data.music.map(a => ({
    title: a.title,
    artist: a.artists?.[0]?.name || "Desconocido",
    duration: convertirTiempo(a.duration_ms),
    url: Object.keys(a.external_metadata || {}).map(i =>
      i === "youtube"
        ? "https://youtu.be/" + a.external_metadata[i].vid
        : i === "deezer"
        ? "https://www.deezer.com/track/" + a.external_metadata[i].track.id
        : i === "spotify"
        ? "https://open.spotify.com/track/" + a.external_metadata[i].track.id
        : ""
    ).filter(Boolean)
  }));
}

function convertirTiempo(ms) {
  if (!ms || typeof ms !== "number") return "00:00";
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return [m, s].map(v => v.toString().padStart(2, "0")).join(":");
}
