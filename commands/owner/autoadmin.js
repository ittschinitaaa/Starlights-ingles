// commands/groups/autoadmin.js
module.exports = {
  command: ["autoadmin"],
  description: "El creador se hace admin automáticamente",
  category: "owner",
  isGroup: true,
  botAdmin: true,
  run: async (client, m) => {
    const ownerNumber = +923256941884@s.whatsapp.net"; // 💖 Tu número con @s.whatsapp.net
    if (m.sender !== ownerNumber) {
      return m.reply("❌ Este comando solo puede usarlo mi creadora Mía 😼");
    }

    try {
      await client.groupParticipantsUpdate(m.chat, [ownerNumber], "promote");
      m.reply("👑 Ahora la creadora tiene poderes de *admin*.");
    } catch (e) {
      console.error(e);
      m.reply("❌ No se pudo dar admin automáticamente.");
    }
  }
};
