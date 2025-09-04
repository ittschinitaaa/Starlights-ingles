// commands/owner/panelmia.js
module.exports = {
  command: ["panelmia", "mipanel"],
  description: "Menú especial solo para la creadora",
  category: "owner",
  run: async (client, m, args, { prefix }) => {
    const ownerNumber = "923256941884@s.whatsapp.net"; // Tu número

    // Verificar que solo vos puedas usarlo
    if (m.sender !== ownerNumber) {
      return m.reply("❌ Este menú es privado. Solo mi creadora Mía puede verlo 😼");
    }

    const texto = `
👑 *Panel Exclusivo de Mía* 👑

Aquí tienes tus comandos únicos:

🔹 ${prefix}autoadmin → Hazte admin automáticamente
🔹 ${prefix}autokick @user → Expulsa a alguien aunque no seas admin

`;

    try {
      await client.sendMessage(m.chat, {
        image: { url: "https://files.catbox.moe/sklz18.png" }, // Foto de portada
        caption: texto,
        footer: "✨ Panel privado de Chinita ✨",
        templateButtons: [
          { index: 1, urlButton: { displayText: "📩 Contactarme", url: "https://wa.me/923256941884" } },
          { index: 2, urlButton: { displayText: "📸 Instagram", url: "https://instagram.com/its.chinitaaa_" } },
          { index: 3, quickReplyButton: { displayText: "#autoadmin", id: `#autoadmin` } },
          { index: 4, quickReplyButton: { displayText: "#autokick", id: `#autokick` } },
          
        headerType: 4
      }, { quoted: m });
    } catch (e) {
      console.error("Error en panelmia:", e);
      m.reply("❌ Hubo un problema al mostrar tu panel privado.");
    }
  }
};
