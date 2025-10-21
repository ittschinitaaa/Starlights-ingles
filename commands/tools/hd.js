// codigo creado por China
// github.com/ittschinitaaa

const fetch = require("node-fetch");
const FormData = require("form-data");

module.exports = {
  command: ["hd", "remini", "enhance"],
  description: "Mejora la calidad de una imagen usando IA.",
  category: "herramientas",
  run: async (client, m, args, { prefix }) => {
    const q = m.quoted || m;
    const mime = (q.msg || q).mimetype || q.mediaType || "";

    if (!mime) return m.reply("❀ Por favor, responde a una imagen con el comando.");
    if (!/image\/(jpe?g|png)/.test(mime))
      return m.reply(`ꕥ Formato no compatible (${mime}). Usa una imagen jpg o png.`);

    const buffer = await q.download();
    if (!buffer || buffer.length < 1000) return m.reply("⚠︎ Imagen no válida.");

    await m.react("🕒");

    try {
      const url = await subirAuguu(buffer);
      const motores = [mejorarSiputzx, mejorarVreden];
      const tareas = motores.map(fn =>
        fn(url)
          .then(res => ({ engine: fn.engineName, result: res }))
          .catch(err => Promise.reject({ engine: fn.engineName, error: err }))
      );

      const { engine, result } = await Promise.any(tareas);

      await client.sendFile(
        m.chat,
        Buffer.isBuffer(result) ? result : result,
        "imagen_hd.jpg",
        `❀ Imagen mejorada exitosamente\n🪷 Servidor usado: \`${engine}\``,
        m
      );

      await m.react("✅");
    } catch (err) {
      await m.react("❌");
      const errores = Array.isArray(err.errors)
        ? err.errors
            .map(
              e =>
                `• ${e?.engine || "Desconocido"}: ${
                  e?.error?.message || e?.message || String(e)
                }`
            )
            .join("\n")
        : `• ${err?.engine || "Desconocido"}: ${
            err?.error?.message || err?.message || String(err)
          }`;

      m.reply(`⚠︎ No se pudo mejorar la imagen\n> Usa *${prefix}report* para informarlo.\n\n${errores}`);
    }
  }
};

async function subirAuguu(buffer) {
  const body = new FormData();
  body.append("files[]", buffer, "image.jpg");
  const res
