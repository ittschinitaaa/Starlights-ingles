// commands/info/user.js
module.exports = {
  command: ["user", "perfil"],
  description: "Muestra información del usuario",
  category: "info",
  async run(client, m) {
    let user = m.sender
    let nombre = m.pushName || "Sin nombre"
    let foto = await client.profilePictureUrl(user, "image").catch(_ => null)

    let texto = `👤 *Tu Perfil*
    
📛 Nombre: ${nombre}
📱 Número: wa.me/${user.split("@")[0]}
🏷️ ID: ${user}`

    if (foto) {
      await client.sendMessage(m.chat, { image: { url: foto }, caption: texto }, { quoted: m })
    } else {
      m.reply(texto)
    }
  }
}
