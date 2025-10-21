// codigo creado por China
// github.com/ittschinitaaa

const fetch = require("node-fetch");

module.exports = {
  command: ["hd"],
  description: "Mejora la calidad de una imagen mediante IA",
  category: "tools",
  run: async (client, m, args) => {
    if (!args[0]) {
      return client.sendMessage(m.chat, { text: "✦ Ingresa la URL de la imagen que deseas mejorar." }, { quoted: m });
    }

    try {
      const url = args[0];
      const api = `https://deliriussapi-oficial.vercel.app/api/tools/hd?url=${encodeURIComponent(url)}`;

      const res = await fetch(api);
      const json = await res.json();

      if (!json || !json.result) {
        return client.sendMessage(m.chat, { text: "⚠️ No se pudo mejorar la imagen. Intenta con otra URL." }, { quoted: m });
      }

      await client.sendMessage(m.chat, {
        image: { url: json.result },
        caption: "✨ Imagen mejorada con éxito mediante IA."
      }, { quoted: m });
    } catch (error) {
      console.error(error);
      client.sendMessage(m.chat, { text: "❌ Ocurrió un error al procesar la imagen." }, { quoted: m });
    }
  },
};
