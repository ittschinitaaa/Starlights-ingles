// código adaptado por china
// github.com/ittschinitaaa

import fetch from "node-fetch";
import crypto from "crypto";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";

module.exports = {
  command: ["catbox", "tourl2"],
  description: "Sube una imagen, video o archivo a Catbox",
  category: "tools",
  use: "(responde a un archivo)",
  run: async (client, m) => {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || "";

    if (!mime)
      return m.reply("⚠️ Por favor, responde a una *imagen, video o archivo válido*.");

    try {
      const media = await q.download();
      const link = await catbox(media);
      const size = formatBytes(media.length);

      const info = `
╭━━━〔 *CATBOX UPLOADER* 〕━━━⬣
┃ 🧃 *Enlace:* ${link}
┃ 📁 *Tamaño:* ${size}
┃ 🕓 *Expiración:* No expira
╰━━━━━━━━━━━━━━━━━━━━━━⬣

> Subido con 💜 por *Starlights Bot*
`;

      await client.sendMessage(
        m.chat,
        { image: { url: "https://files.catbox.moe/6s6q6b.jpg" }, caption: info },
        { quoted: m },
      );
    } catch (e) {
      console.error(e);
      m.reply("❌ Hubo un error al subir el archivo a *Catbox*.");
    }
  },
};

// ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}

async function catbox(content) {
  const { ext, mime } = (await fileTypeFromBuffer(content)) || {};
  const blob = new Blob([content.toArrayBuffer()], { type: mime });
  const formData = new FormData();
  const randomBytes = crypto.randomBytes(5).toString("hex");

  formData.append("reqtype", "fileupload");
  formData.append("fileToUpload", blob, `${randomBytes}.${ext}`);

  const res = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: formData,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36",
    },
  });
