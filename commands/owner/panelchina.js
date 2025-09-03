// commands/owner/panelmia.js
module.exports = {
  command: ["panelchina", "china","menuowner"],
  description: "Menú especial solo para la creadora",
  category: "owner",
  run: async (client, m, args, { prefix }) => {
    const ownerNumber = "923256941884@s.whatsapp.net"; // 💖 Tu número

    // Verificar que solo vos puedas usarlo
    if (m.sender !== ownerNumber) {
      return m.reply("❌ Este menú es privado. Solo mi creadora Mía puede verlo 😼");
    }

    const menuMia = `
👑 *Panel Exclusivo de Mía* 👑

✨ Aquí tienes tus comandos únicos:

🔹 ${prefix}autoadmin 
🔹 ${prefix}autokick @user 

🌸 Con gran poder viene gran responsabilidad 💖
    `;

    try {
      await client.sendMessage(m.chat, {
        image: { url: "https://files.catbox.moe/sklz18.png" }, // 🌸 Foto tuya o de portada
        caption: menuMia,
        footer: "✨ Panel privado de Chinita ✨",
        buttons: [
          { buttonId: `#autoadmin`, buttonText: { displayText: "#autoAdmin" }, type: 1 },
          { buttonId: `#autokick`, buttonText: { displayText: "#autoKick" }, type: 1 },
          { buttonId: `#update`, buttonText: { displayText: "#update" }, type: 1 },
          }
        headerType: 4
      }, { quoted: m });
    } catch (e) {
      console.error("Error en panelmia:", e);
      m.reply("❌ Hubo un problema al mostrar tu panel privado.");
    }
  }
};
