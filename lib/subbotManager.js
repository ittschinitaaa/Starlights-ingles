// subbotManager.js — Sistema de sub-bots reales
// creado por china 💖

const fs = require("fs");
const path = require("path");
const pino = require("pino");
const chalk = require("chalk");
const { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys");

async function loadSubBots() {
  const baseDir = path.join(__dirname, "../subbots");
  if (!fs.existsSync(baseDir)) return;

  const dirs = fs.readdirSync(baseDir);
  for (const dir of dirs) {
    const sessionDir = path.join(baseDir, dir);
    try {
      const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
      const { version } = await fetchLatestBaileysVersion();

      const subClient = makeWASocket({
        version,
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        browser: ["Starlights-SubBot", "Chrome", "10.0"],
        auth: state,
      });

      subClient.ev.on("creds.update", saveCreds);

      subClient.ev.on("connection.update", (update) => {
        const { connection } = update;
        if (connection === "open") {
          console.log(chalk.greenBright(`✅ Sub-bot conectado: ${dir}`));
        } else if (connection === "close") {
          console.log(chalk.redBright(`❌ Sub-bot desconectado: ${dir}`));
        }
      });
    } catch (err) {
      console.log(chalk.red(`Error al cargar sub-bot ${dir}:`, err));
    }
  }
}

module.exports = { loadSubBots };
