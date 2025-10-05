// código adaptado para Starlights ✨
// creadora: china
// github.com/ittschinitaaa

import fetch from 'node-fetch';
import baileys from '@whiskeysockets/baileys';

async function sendAlbumMessage(client, jid, medias, options = {}) {
  if (typeof jid !== "string") throw new TypeError("jid must be string");
  if (medias.length < 2) throw new RangeError("Minimum 2 media");

  const caption = options.text || options.caption || "";
  const delay = !isNaN(options.delay) ? options.delay : 500;
  delete options.text;
  delete options.caption;
  delete options.delay;

  const album = baileys.generateWAMessageFromContent(
    jid,
    {
      messageContextInfo: {},
      albumMessage: {
        expectedImageCount: medias.filter(m => m.type === "image").length,
        expectedVideoCount: medias.filter(m => m.type === "video").length,
        ...(options.quoted ? {
          contextInfo: {
            remoteJid: options.quoted.key.remoteJid,
            fromMe: options.quoted.key.fromMe,
            stanzaId: options.quoted.key.id,
            participant: options.quoted.key.participant || options.quoted.key.remoteJid,
            quotedMessage: options.quoted.message,
          },
        } : {}),
      },
    },
    {}
  );

  await client.relayMessage(album.key.remoteJid, album.message, { messageId: album.key.id });

  for (let i = 0; i < medias.length; i++) {
    const { type, data } = medias[i];
    try {
      const msg = await baileys.generateWAMessage(
        album.key.remoteJid,
        { [type]: data, ...(i === 0 ? { caption } : {}) },
        { upload: client.waUploadToServer }
      );
      msg.message.messageContextInfo = { messageAssociation: { associationType: 1, parentMessageKey: album.key } };
      await client.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
      await baileys.delay(delay);
    } catch (err) {
      console.warn(`[WARN MEME] No se pudo enviar la imagen ${i + 1}:`, err.message);
      continue;
    }
  }

  return album;
}

module.exports = {
  command: ["meme", "memes"],
  description: "Envía un conjunto de memes aleatorios 😄",
  category: "fun",
  run: async (client, m) => {
    try {
      const res = await fetch('https://api.kirito.my/api/meme?apikey=by_deylin');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      if (!json.memes || !Array.isArray(json.memes)) throw new Error('No se encontraron memes');

      const maxMemes = Math.min(json.memes.length, 8);
      const medias = [];

      for (let i = 0; i < maxMemes; i++) {
        medias.push({ type: 'image', data: { url: json.memes[i] } });
      }

      const fkontak = {
        key: { fromMe: false, participant: m.sender },
        message: {
          documentMessage: {
            title: "Memes Aleatorios",
            fileName: `𝗠𝗘𝗠𝗘𝗦_𝗗𝗘_𝗦𝗧𝗔𝗥𝗟𝗜𝗚𝗛𝗧𝗦`,
          }
        }
      };

      await sendAlbumMessage(client, m.chat, medias, {
        caption: `✨ Aquí tienes tus memes aleatorios 😸\n_Disfrútalos con una sonrisa_ 💫`,
        quoted: fkontak
      });

    } catch (e) {
      console.error('[ERROR MEMES]', e);
      m.reply(`😿 Ocurrió un error al obtener los memes.\n\n${e.message}`);
    }
  },
};
