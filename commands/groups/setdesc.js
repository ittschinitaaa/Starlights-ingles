// codigo creado por china
// github.com/ittschinitaaa
module.exports = {
  command: ["setdesc", "descripcion"],
  description: "Cambia la descripción del grupo",
  category: "groups",
  isGroup: true,
  isAdmin: true,
  botAdmin: true,

  async run(client, m, args) {
    if (!args[0]) return m.reply("❗ Escribe la nueva descripción del grupo.");
    const newDesc = args.join(" ");
    await client.groupUpdateDescription(m.chat, newDesc);
    await m.reply("✅ La descripción del grupo ha sido actualizada.");
  }
};
