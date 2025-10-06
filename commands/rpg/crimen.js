// código RPG creado por China adaptado a Starlights
// github: github.com/ittschinitaaa

let cooldowns = {}

module.exports = {
  command: ['crimen', 'crime'],
  description: 'Comete un crimen y gana o pierde coins',
  category: 'economy',
  isGroup: true,
  run: async (client, m, args) => {
    try {
      const users = global.db.data.users
      const senderId = m.sender

      // --- función para obtener nombre seguro ---
      const getDisplayName = async (jid) => {
        try {
          const contact = await client.onWhatsApp(jid)
          if (contact && contact[0]?.notify) return contact[0].notify
          return jid.split("@")[0]
        } catch {
          return jid.split("@")[0]
        }
      }

      const senderName = await getDisplayName(senderId)

      // --- cooldown de 5 minutos ---
      const tiempo = 5 * 60
      if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < tiempo * 1000) {
        const tiempoRestante = segundosAHMS(Math.ceil((cooldowns[senderId] + tiempo * 1000 - Date.now()) / 1000))
        return m.reply(`⏱️ Ya has cometido un crimen recientemente, espera *${tiempoRestante}* para tu próximo crimen.`)
      }
      cooldowns[senderId] = Date.now()

      const senderCoin = users[senderId].coin || 0
      let randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]

      while (randomUserId === senderId) {
        randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]
      }

      const randomUserCoin = users[randomUserId].coin || 0
      const minAmount = 15
      const maxAmount = 50
      const amountTaken = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount
      const randomOption = Math.floor(Math.random() * 3)

      const randomUserName = await getDisplayName(randomUserId)
      const moneda = '💸'
      const emoji = '🕵️‍♂️'
      const emoji2 = '❌'

      switch (randomOption) {
        case 0:
          users[senderId].coin += amountTaken
          users[randomUserId].coin -= amountTaken
          await client.sendMessage(
            m.chat,
            { text: `${emoji} ¡Lograste cometer tu crimen con éxito! Robaste *${amountTaken} ${moneda}* a @${randomUserName}`, contextInfo: { mentionedJid: [randomUserId] } },
            { quoted: m }
          )
          break
        case 1:
          const amountSubtracted = Math.min(Math.floor(Math.random() * (senderCoin - minAmount + 1)) + minAmount, maxAmount)
          users[senderId].coin -= amountSubtracted
          await m.reply(`${emoji2} No fuiste cuidadoso y te atraparon. Se restaron *-${amountSubtracted} ${moneda}* a ${senderName}.`)
          break
        case 2:
          const smallAmountTaken = Math.min(Math.floor(Math.random() * (randomUserCoin / 2 - minAmount + 1)) + minAmount, maxAmount)
          users[senderId].coin += smallAmountTaken
          users[randomUserId].coin -= smallAmountTaken
          await client.sendMessage(
            m.chat,
            { text: `${emoji} Lograste cometer tu crimen, pero te descubrieron y solo lograste tomar *${smallAmountTaken} ${moneda}* de @${randomUserName}`, contextInfo: { mentionedJid: [randomUserId] } },
            { quoted: m }
          )
          break
      }

      global.db.write()
    } catch (err) {
      console.error(err)
      m.reply('❌ Ocurrió un error al ejecutar el comando.')
    }
  }
}

// --- función para convertir segundos a minutos y segundos ---
function segundosAHMS(segundos) {
  let horas = Math.floor(segundos / 3600)
  let minutos = Math.floor((segundos % 3600) / 60)
  let segundosRestantes = segundos % 60
  return `${minutos} minutos y ${segundosRestantes} segundos`
        }
