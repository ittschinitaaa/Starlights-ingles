// código creado por China
// github: github.com/ittschinitaaa

let cooldowns = {}

module.exports = {
  command: ['slut', 'prostituirse'],
  description: 'Comando RPG: realiza acciones para ganar o perder monedas',
  category: 'rpg',
  isGroup: true,
  run: async (client, m, args) => {
    try {
      let users = global.db.data.users
      let senderId = m.sender

      // función segura para obtener nombres
      const getDisplayName = async (jid) => {
        try {
          const contact = await client.onWhatsApp(jid)
          if (contact && contact[0]?.notify) return contact[0].notify
          return jid.split("@")[0]
        } catch {
          return jid.split("@")[0]
        }
      }

      let senderName = await getDisplayName(senderId)

      // --- cooldown ---
      let tiempo = 5 * 60
      if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < tiempo * 1000) {
        let tiempo2 = segundosAHMS(Math.ceil((cooldowns[senderId] + tiempo * 1000 - Date.now()) / 1000))
        return client.sendMessage(m.chat, { text: `⏱️ Debes esperar *${tiempo2}* para usar este comando de nuevo.` }, { quoted: m })
      }
      cooldowns[senderId] = Date.now()

      // --- seleccionar usuario aleatorio ---
      let randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]
      while (randomUserId === senderId) {
        randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]
      }
      let randomUserName = await getDisplayName(randomUserId)

      // --- monedas ---
      let senderCoin = users[senderId].coin || 0
      let randomUserCoin = users[randomUserId].coin || 0
      let minAmount = 15
      let maxAmount = 50
      let amountTaken = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount
      let randomOption = Math.floor(Math.random() * 3)

      switch (randomOption) {
        case 0:
          users[senderId].coin += amountTaken
          users[randomUserId].coin -= amountTaken
          await client.sendMessage(m.chat, {
            text: `💸 ¡Éxito! ${senderName} le chupó a ${randomUserName} y ganó *${amountTaken} monedas*.\n\nSe suman *+${amountTaken} monedas* a ${senderName}.`,
            mentions: [randomUserId],
          }, { quoted: m })
          break
        case 1:
          let amountSubtracted = Math.min(Math.floor(Math.random() * (senderCoin - minAmount + 1)) + minAmount, maxAmount)
          users[senderId].coin -= amountSubtracted
          await client.sendMessage(m.chat, { text: `❌ Fallaste, ${senderName} perdió *${amountSubtracted} monedas*.` }, { quoted: m })
          break
        case 2:
          let smallAmountTaken = Math.min(Math.floor(Math.random() * (randomUserCoin / 2 - minAmount + 1)) + minAmount, maxAmount)
          users[senderId].coin += smallAmountTaken
          users[randomUserId].coin -= smallAmountTaken
          await client.sendMessage(m.chat, {
            text: `⚠️ Parcial éxito: ${senderName} logró ganar *${smallAmountTaken} monedas* de ${randomUserName}.`,
            mentions: [randomUserId],
          }, { quoted: m })
          break
      }

      global.db.write()
    } catch (err) {
      console.error(err)
      client.sendMessage(m.chat, { text: '❌ Ocurrió un error ejecutando el comando.' }, { quoted: m })
    }
  }
}

function segundosAHMS(segundos) {
  let horas = Math.floor(segundos / 3600)
  let minutos = Math.floor((segundos % 3600) / 60)
  let segundosRestantes = segundos % 60
  return `${minutos} minutos y ${segundosRestantes} segundos`
}
