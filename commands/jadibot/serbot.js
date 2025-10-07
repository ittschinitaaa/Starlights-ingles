// código creado por China
// github.com/ittschinitaaa

import { useMultiFileAuthState, makeCacheableSignalKeyStore, fetchLatestBaileysVersion } from "@whiskeysockets/baileys"
import qrcode from "qrcode"
import fs from "fs"
import path from "path"
import pino from "pino"
import NodeCache from "node-cache"
import chalk from "chalk"
import { makeWASocket } from "../lib/simple.js"

const subBotCache = new NodeCache({ stdTTL: 300 }) // códigos de 8 dígitos expiran en 5 min

if (!global.conns) global.conns = [] // lista de sub-bots activos

function generateCode(userId) {
  const code = Math.floor(10000000 + Math.random() * 90000000).toString()
  subBotCache.set(code, userId)
  return code
}

function verifyCode(code) {
  const userId = subBotCache.get(code)
  if (!userId) return null
  subBotCache.del(code)
  return userId
}

function isSubBotConnected(jid) {
  return global.conns.some(sock => sock?.user?.jid.split("@")[0] === jid.split("@")[0])
}

async function createSubBot(userId, m, client, useCode = false) {
  const pathCreds = path.join("./bots/subBots/users", userId)
  if (!fs.existsSync(pathCreds)) fs.mkdirSync(pathCreds, { recursive: true })

  const { state, saveCreds } = await useMultiFileAuthState(pathCreds)
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })) },
    logger: pino({ level: "fatal" }),
    printQRInTerminal: false,
    browser: ['Starlights', 'Safari', '1.0.0'],
    version
  })

  sock.isInit = false

  sock.ev.on("connection.update", async (update) => {
    const { connection, qr, lastDisconnect } = update

    if (qr && !useCode) {
      // mostrar QR al usuario
      const qrImage = await qrcode.toBuffer(qr, { scale: 8 })
      if (m?.chat) {
        await client.sendMessage(m.chat, { image: qrImage, caption: "*❀ Starlights • Sub-Bot*\nEscanea este QR para iniciar sesión." }, { quoted: m })
      }
    }

    if (qr && useCode) {
      // generar código temporal para vincular
      const secret = await sock.requestPairingCode(userId)
      await client.reply(m.chat, `Tu código para conectar el Sub-Bot es:\n\n*${secret}*`, m)
    }

    if (connection === "open") {
      sock.isInit = true
      global.conns.push(sock)
      console.log(chalk.bold.cyanBright(`Sub-Bot de ${userId} conectado correctamente.`))
      if (m?.chat) {
        await client.sendMessage(m.chat, { text: `✅ @${userId}, tu Sub-Bot está activo.`, mentions: [m.sender] }, { quoted: m })
      }
    }

    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode
      console.log(chalk.bold.red(`Sub-Bot ${userId} desconectado. Razón: ${reason}`))
      try { sock.ev.removeAllListeners() } catch {}
      const index = global.conns.indexOf(sock)
      if (index >= 0) global.conns.splice(index, 1)
    }
  })

  sock.ev.on("creds.update", saveCreds)
  return sock
}

module.exports = {
  command: ["code", "jadibot"],
  description: "Conviértete en un Sub-Bot temporal",
  category: "jadibot",
  isGroup: false,
  isAdmin: false,
  botAdmin: false,
  use: "[código de 8 dígitos opcional]",
  run: async (client, m, args) => {
    const userId = m.sender.split("@")[0]

    // Generar código si no se envía ninguno
    if (!args[0]) {
      const code = generateCode(userId)
      return m.reply(`Tu código de 8 dígitos para convertirte en Sub-Bot es:\n\n*${code}*\n\nTiene 5 minutos de validez.`)
    }

    // Verificar código
    const code = args[0]
    const verifiedUser = verifyCode(code)
    if (!verifiedUser || verifiedUser !== userId) return m.reply("Código inválido o expirado ❌")

    // Verificar si ya hay un sub-bot activo
    if (isSubBotConnected(userId)) return m.reply("Ya tienes un Sub-Bot activo ✅")

    // Crear sub-bot con QR
    await createSubBot(userId, m, client)
  },
}
