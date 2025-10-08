const pino = require("pino");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
} = require("@whiskeysockets/baileys");

async function createConnection(sessionPath, name = "Starlights") {
  const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger: pino({ level: "silent" }),
    printQRInTerminal: false,
    browser: [name, "Chrome", "1.0.0"],
    auth: state,
  });

  sock.ev.on("creds.update", saveCreds);
  return sock;
}

module.exports = { createConnection };
