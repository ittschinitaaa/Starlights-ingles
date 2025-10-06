// código creado por Starlights
// github: github.com/miaoficial02/Starlights

module.exports = {
  command: ["crimen", "crime"],
  description: "Comete un crimen y roba monedas a otros usuarios",
  category: "economy",
  isGroup: true,
  isAdmin: false,
  botAdmin: false,
  use: "",

  run: async (client, m) => {
    try {
      const users = global.db.data.users
      const senderId = m.sender
      const senderName = await client.getName(senderId)

      // --- cooldown ---
      const cooldowns = global.cooldowns || {}
      const tiempo = 5 * 60 * 1000 // 5 minutos en ms
      if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < tiempo) {
        let restante = Math.ceil((cooldowns[senderId] + tiempo - Date.now()) / 1000)
        let minutos = Math.floor(restante / 60)
        let segundos = restante % 60
        return client.sendMessage(
          m.chat,
          { text: `⏱️ Ya cometiste un crimen recientemente. Espera *${minutos}m ${segundos}s* antes de tu próximo intento.`, mentions: [senderId] },
          { quoted: m }
        )
      }
      cooldowns[senderId] = Date.now()
      global.cooldowns = cooldowns

      // --- elegir víctima aleatoria ---
      let randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]
      while (randomUserId === senderId) {
        randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]
      }

      const senderCoin = users[senderId].coin || 0
      const randomUserCoin = users[randomUserId].coin || 0
      const minAmount = 15
      const maxAmount = 50
      const amountTaken = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount

      const outcome = Math.floor(Math.random() * 3)

      switch (outcome) {
        case 0: // crimen exitoso
          users[senderId].coin += amountTaken
          users[randomUserId].coin -= amountTaken
          await client.sendMessage(
            m.chat,
            { text: `💸 ¡Crimen exitoso! ${senderName} robó *${amountTaken} 💰* de @${randomUserId.split("@")[0]}`, mentions: [randomUserId] },
            { quoted: m }
          )
          break
        case 1: // atrapado
          const amountSubtracted = Math.min(Math.floor(Math.random() * (senderCoin - minAmount + 1)) + minAmount, maxAmount)
          users[senderId].coin -= amountSubtracted
          await client.sendMessage(
            m.chat,
            { text: `⚠️ Te atraparon mientras cometías el crimen, se te restaron *-${amountSubtracted} 💰*`, mentions: [senderId] },
            { quoted: m }
          )
          break
        case 2: // crimen parcial
          const smallAmountTaken = Math.min(Math.floor(Math.random() * (randomUserCoin / 2 - minAmount + 1)) + minAmount, maxAmount)
          users[senderId].coin += smallAmountTaken
          users[randomUserId].coin -= smallAmountTaken
          await client.sendMessage(
            m.chat,
            { text: `💥 Crimen detectado parcialmente. Solo lograste robar *${smallAmountTaken} 💰* de @${randomUserId.split("@")[0]}`, mentions: [randomUserId] },
            { quoted: m }
          )
          break
      }

      global.db.write()
    } catch (err) {
      console.error(err)
      await client.sendMessage(m.chat, { text: "❌ Error al ejecutar el comando *crimen*." }, { quoted: m })
    }
  }
}
