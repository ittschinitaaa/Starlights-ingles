// commands/info/userinfo.js
module.exports = {
  command: ["userinfo", "perfil"],
  description: "Muestra información de un usuario",
  category: "info",
  isGroup: false,
  use: "(@0 o responder a un mensaje)",
  run: async (client, m, args) => {
    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;

    try {
      const contact = await client.onWhatsApp(user);
      const profile = await client.getContact(user);
      const name = profile.notify || profile.name || "Desconocido";
      const number = user.split("@")[0];
      const isAdmin = m.isGroup ? (await client.getGroupAdmins(m.chat)).includes(user) : false;
      const bio = profile.status || "Sin estado";

      let infoMsg = `📌 *Información de Usuario*\n\n`;
      infoMsg += `👤 Nombre: ${name}\n`;
      infoMsg += `📱 Número: +${number}\n`;
      infoMsg += `🆔 ID: ${user}\n`;
      infoMsg += `💬 Estado: ${bio}\n`;
      if (m.isGroup) infoMsg += `⭐ Admin: ${isAdmin ? "Sí" : "No"}\n`;

      m.reply(infoMsg);
    } catch (e) {
      console.error(e);
      m.reply("❌ No se pudo obtener la información del usuario");
    }
  },
};
