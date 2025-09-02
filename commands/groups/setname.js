module.exports = {
  command: ["setname", "nombregrupo"],
  description: "Cambia el nombre del grupo",
  category: "groups",
  isGroup: true,
  isAdmin: true,
  botAdmin: true,

  async run(client, m, args) {
    if (!args[0]) return m.reply("❗ Escribe el nuevo nombre del grupo.");
    const newName = args.join(" ");
    await client.groupUpdateSubject(m.chat, newName);
    await m.reply(`✅ El nombre del grupo ha sido cambiado a:\n*${newName}*`);
  }
};
