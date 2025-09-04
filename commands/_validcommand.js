// Archivo: plugins/_validcommand.js

export async function before(m) {
  if (!m.text || !global.prefix.test(m.text)) return;

  const usedPrefix = global.prefix.exec(m.text)[0];
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

  if (!command || command === 'bot') return;

  // Verifica si el comando existe en los plugins
  const isValidCommand = (cmd, plugins) => {
    return Object.values(plugins).some(plugin =>
      plugin.command &&
      (Array.isArray(plugin.command) ? plugin.command : [plugin.command]).includes(cmd)
    );
  };

  if (!isValidCommand(command, global.plugins)) {
    const comando = m.text.trim().split(' ')[0];

    await m.reply(
`╭━⊱ ❌ 𝗖𝗼𝗺𝗮𝗻𝗱𝗼 𝗶𝗻𝘃𝗮́𝗹𝗶𝗱𝗼 ❌ ⊱━╮
┃ 💬 El comando *${comando}* no existe.
┃ 📌 Usa: *${usedPrefix}help*
┃ 🧾 Para ver la lista de comandos.
╰━━━━━━━━━━━━━━━━━╯`)
  }
}
