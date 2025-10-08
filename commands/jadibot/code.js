// code.js — creado por Chinita (Starlights)
import { useMultiFileAuthState, makeWASocket, fetchLatestBaileysVersion } from "@whiskeysockets/baileys"

export default {
  command: ["code", "pairing", "subbot"],
  description: "Genera un código de emparejamiento para crear un sub-bot",
  category: "jadibot",
  run: async (client, m) => {
    try {
      if (!client.user || !client.ws.socket || client.ws.socket.readyState !== 1) {
        return m.reply("⚠️ El bot aún no está conectado a WhatsApp. Espera unos segundos y vuelve a intentarlo.")
      }

      const userJid = m.sender
      const code = await client.requestPairingCode(userJid)

      await m.reply(`🔗 *Código de emparejamiento generado:*\n\n\`\`\`${code}\`\`\`\n\nUsa este código en tu WhatsApp para vincular un sub-bot.`)
    } catch (e) {
      console.error(e)
      if (e.output?.payload?.message === "Connection Closed") {
        m.reply("⚠️ No se pudo generar el código porque la conexión con WhatsApp se cerró. Reinicia el bot o espera unos segundos.")
      } else {
        m.reply("❌ Error al generar el código de emparejamiento.")
      }
    }
  },
}
