const { downloadContentFromMessage } = require('@whiskeysockets/baileys')

module.exports = {
  command: ['readviewonce', 'read', 'readvo'],
  description: 'Permite ver contenido de un mensaje "ViewOnce"',
  category: 'tools',
  premium: true,
  run: async (client, m, args, { prefix }) => {
    const quoted = m.quoted
    if (!quoted) return client.sendMessage(m.chat, { text: `❀ Por favor, responde a un mensaje de una sola vez "ViewOnce" para ver su contenido.` }, { quoted: m })

    try {
      await client.sendMessage(m.chat, { react: { text: "🕒", key: m.key } })

      const viewOnceMessage = quoted.viewOnce ? quoted : quoted.mediaMessage?.imageMessage || quoted.mediaMessage?.videoMessage || quoted.mediaMessage?.audioMessage
      const messageType = viewOnceMessage.mimetype || quoted.mtype
      const stream = await downloadContentFromMessage(viewOnceMessage, messageType.split('/')[0])
      if (!stream) return client.sendMessage(m.chat, { text: `ꕥ No se pudo descargar el contenido.` }, { quoted: m })

      let buffer = Buffer.from([])
      for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk])

      if (messageType.includes('video')) {
        await client.sendMessage(
          m.chat,
          { video: buffer, caption: viewOnceMessage.caption || '', mimetype: 'video/mp4' },
          { quoted: m }
        )
      } else if (messageType.includes('image')) {
        await client.sendMessage(
          m.chat,
          { image: buffer, caption: viewOnceMessage.caption || '' },
          { quoted: m }
        )
      } else if (messageType.includes('audio')) {
        await client.sendMessage(
          m.chat,
          { audio: buffer, mimetype: 'audio/ogg; codecs=opus', ptt: viewOnceMessage.ptt || false },
          { quoted: m }
        )
      }

      await client.sendMessage(m.chat, { react: { text: "✔️", key: m.key } })
    } catch (e) {
      await client.sendMessage(m.chat, { react: { text: "✖️", key: m.key } })
      client.sendMessage(
        m.chat,
        { text: `⚠︎ Se ha producido un problema.\n> Usa *${prefix}report* para informarlo.\n\n${e.message}` },
        { quoted: m }
      )
    }
  }
}
