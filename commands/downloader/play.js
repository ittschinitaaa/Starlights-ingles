const fetch = require("node-fetch");
const yts = require("yt-search");
const axios = require("axios");

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/;

module.exports = {
  command: ["play"],
  description: "Descarga audio o video de YouTube",
  category: "downloader",
  run: async (client, m, args, { prefix }) => {
    try {
      if (!args.join(" ").trim()) 
        return client.sendMessage(m.chat, { text: "🔔 *Por favor, ingresa el nombre o link del archivo a descargar.*" }, { quoted: m });

      await client.sendMessage(m.chat, { text: "🎧 Buscando tu canción..." }, { quoted: m });

      const text = args.join(" ");
      let videoIdMatch = text.match(youtubeRegexID);
      let search = await yts(videoIdMatch ? 'https://youtu.be/' + videoIdMatch[1] : text);
      let video = videoIdMatch
        ? search.all.find(v => v.videoId === videoIdMatch[1]) || search.videos.find(v => v.videoId === videoIdMatch[1])
        : search.videos?.[0];

      if (!video) return client.sendMessage(m.chat, { text: '❌ *No se encontraron resultados para tu búsqueda.*' }, { quoted: m });

      const { title, thumbnail, timestamp, views, ago, url, author } = video;
      const vistas = formatViews(views);
      const canal = author?.name || 'Desconocido';

      const infoMessage = `*🎵 Título:* ${title}
*🎬 Canal:* ${canal}
*👀 Vistas:* ${vistas}
*⏳ Duración:* ${timestamp}
*📆 Publicado:* ${ago}
*🔗 Link:* ${url}`.trim();

      const thumb = (await client.getFile(thumbnail))?.data;
      const external = {
        contextInfo: {
          externalAdReply: {
            title,
            body: 'Descargando archivo',
            mediaType: 1,
            previewType: 0,
            mediaUrl: url,
            sourceUrl: url,
            thumbnail: thumb,
            renderLargerThumbnail: true
          }
        }
      };

      await client.sendMessage(m.chat, { text: infoMessage, mentions: [m.sender], ...external }, { quoted: m });

      // Detecta si quiere video o audio
      const isVideo = text.toLowerCase().includes("video");

      if (isVideo) {
        try {
          const res = await fetch(`https://api.stellarwa.xyz/dow/ytmp4?url=${url}&apikey=Diamond`);
          const json = await res.json();

          if (!json.status || !json.data?.dl) throw '⚠️ *No se obtuvo enlace de video.*';
          const data = json.data;
          const size = await getSize(data.dl);
          const sizeStr = size ? await formatSize(size) : 'Desconocido';

          let caption = `🎬 *Título:* ${data.title || title}\n*📦 Tamaño:* ${sizeStr}`;
          await client.sendFile(m.chat, data.dl, `${data.title || 'video'}.mp4`, caption, m);
          await m.react('✅');
        } catch (e) {
          return client.sendMessage(m.chat, { text: '⚠️ *No se pudo enviar el video. El archivo podría ser muy pesado o hubo un error en el enlace.*' }, { quoted: m });
        }
      } else {
        try {
          const res = await fetch(`https://api.vreden.my.id/api/v1/download/youtube/audio?url=${url}&quality=130`);
          const json = await res.json();

          if (!json.result?.download?.url) throw '*⚠️ No se obtuvo un enlace válido.*';

          await client.sendMessage(m.chat, {
            audio: { url: json.result.download.url },
            mimetype: 'audio/mpeg',
            fileName: json.result.download.filename || `${json.result.metadata?.title || title}.mp3`,
            contextInfo: {
              externalAdReply: {
                title,
                body: 'Archivo descargado',
                mediaType: 1,
                thumbnail: thumb,
                mediaUrl: url,
                sourceUrl: url,
                renderLargerThumbnail: true
              }
            }
          }, { quoted: m });

          await m.react('✅');
        } catch (e) {
          return client.sendMessage(m.chat, { text: '*❌ No se pudo enviar el audio. El archivo podría ser demasiado pesado o hubo un error en la generación del enlace.*' }, { quoted: m });
        }
      }

    } catch (err) {
      return client.sendMessage(m.chat, { text: `❌ *Ocurrió un error* \n${err}` }, { quoted: m });
    }
  }
};

// Funciones auxiliares
function formatViews(views) {
  if (views === undefined) return "No disponible";
  if (views >= 1e9) return `${(views / 1e9).toFixed(1)}B (${views.toLocaleString()})`;
  if (views >= 1e6) return `${(views / 1e6).toFixed(1)}M (${views.toLocaleString()})`;
  if (views >= 1e3) return `${(views / 1e3).toFixed(1)}K (${views.toLocaleString()})`;
  return views.toString();
}

async function getSize(downloadUrl) {
  try {
    const response = await axios.head(downloadUrl, { maxRedirects: 5 });
    const length = response.headers['content-length'];
    return length ? parseInt(length, 10) : null;
  } catch (error) {
    console.error("Error al obtener el tamaño:", error.message);
    return null;
  }
}

async function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  if (!bytes || isNaN(bytes)) return 'Desconocido';
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}
