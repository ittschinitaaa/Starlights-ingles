require("./settings");
require("./lib/database");
const {
  default: makeWASocket,
  makeCacheableSignalKeyStore,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  jidDecode,
  DisconnectReason,
} = require("@whiskeysockets/baileys");
const pino = require("pino");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const os = require("os");
const qrcode = require("qrcode-terminal");
const parsePhoneNumber = require("awesome-phonenumber");
const { smsg } = require("./lib/message");
const { app, server } = require("./lib/server");
const { Boom } = require("@hapi/boom");
const { exec } = require("child_process");

const print = (label, value) =>
  console.log(
    `${chalk.green.bold("║")} ${chalk.cyan.bold(label.padEnd(16))}${chalk.magenta.bold(":")} ${value}`,
  );
const question = (text) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(text, resolve);
  });
};
const usePairingCode = true;

const log = {
  info: (msg) => console.log(chalk.bgBlue.white.bold(`INFO`), chalk.white(msg)),
  success: (msg) =>
    console.log(chalk.bgGreen.white.bold(`SUCCESS`), chalk.greenBright(msg)),
  warn: (msg) =>
    console.log(
      chalk.bgYellowBright.blueBright.bold(`WARNING`),
      chalk.yellow(msg),
    ),
  warning: (msg) =>
    console.log(chalk.bgYellowBright.red.bold(`WARNING`), chalk.yellow(msg)),
  error: (msg) =>
    console.log(chalk.bgRed.white.bold(`ERROR`), chalk.redBright(msg)),
};

const userInfoSyt = () => {
  try {
    return os.userInfo().username;
  } catch (e) {
    return process.env.USER || process.env.USERNAME || "desconocido";
  }
};

console.log(
  chalk.yellow.bold(
    `╔═════[${`${chalk.yellowBright(userInfoSyt())}${chalk.white.bold("@")}${chalk.yellowBright(os.hostname())}`}]═════`,
  ),
);
print("OS", `${os.platform()} ${os.release()} ${os.arch()}`);
print(
  "Actividad",
  `${Math.floor(os.uptime() / 3600)} h ${Math.floor((os.uptime() % 3600) / 60)} m`,
);
print("Shell", process.env.SHELL || process.env.COMSPEC || "desconocido");
print("CPU", os.cpus()[0]?.model.trim() || "unknown");
print(
  "Memory",
  `${(os.freemem() / 1024 / 1024).toFixed(0)} MiB / ${(os.totalmem() / 1024 / 1024).toFixed(0)} MiB`,
);
print("Script version", `v${require("./package.json").version}`);
print("Node.js", process.version);
print("Baileys", `WhiskeySockets/baileys`);
print(
  "Date & Time",
  new Date().toLocaleString("en-US", {
    timeZone: "America/Argentina/Buenos_Aires",
    hour12: false,
  }),
);
console.log(chalk.yellow.bold("╚" + "═".repeat(30)));

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState(global.sessionName);
  const { version } = await fetchLatestBaileysVersion();

  console.info = () => {};
  console.debug = () => {};
  const client = makeWASocket({
    version,
    logger: pino({ level: "silent" }),
    printQRInTerminal: false,
    browser: ["Linux", "Opera"],
    auth: state,
  });

  if (!client.authState.creds.registered) {
    const phoneNumber = await question(
      log.warn("Enter your WhatsApp number\n") +
        log.info("Example: 573243768166\n"),
    );
    try {
      log.info("Requesting pairing code...");
      const pairing = await client.requestPairingCode(phoneNumber, "S1T2A3R4"); 
      log.success(
        `Pairing code: ${chalk.cyanBright(pairing)} (expires in 15s)`,
      );
    } catch (err) {
      log.error("Error requesting pairing code:", err);
      exec("rm -rf ./lurus_session/*");
      process.exit(1);
    }
  }

  await global.loadDatabase();
  console.log(chalk.yellow("Database loaded successfully."));

  client.sendText = (jid, text, quoted = "", options) =>
    client.sendMessage(jid, { text, ...options }, { quoted });

  client.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (reason === DisconnectReason.connectionLost) {
        log.warning(
          "Connection to the server was lost, I'm trying to reconnect...",
        );
        startBot();
      } else if (reason === DisconnectReason.connectionClosed) {
        log.warning("Connection closed, attempting to reconnect...");
        startBot();
      } else if (reason === DisconnectReason.restartRequired) {
        log.warning("Reboot required...");
        startBot();
      } else if (reason === DisconnectReason.timedOut) {
        log.warning("Connection timed out, trying to reconnect...");
        startBot();
      } else if (reason === DisconnectReason.badSession) {
        log.warning("Delete session and scan again...");
        startBot();
      } else if (reason === DisconnectReason.connectionReplaced) {
        log.warning("First, log out of your current session...");
      } else if (reason === DisconnectReason.loggedOut) {
        log.warning("Scan again and run...");
        exec("rm -rf ./lurus_session/*");
        process.exit(1);
      } else if (reason === DisconnectReason.forbidden) {
        log.error("Connection error, please scan again and run...");
        exec("rm -rf ./lurus_session/*");
        process.exit(1);
      } else if (reason === DisconnectReason.multideviceMismatch) {
        log.warning("Start again");
        exec("rm -rf ./lurus_session/*");
        process.exit(0);
      } else {
        client.end(
          `Unknown disconnection reason : ${reason}|${connection}`,
        );
      }
    }
    if (connection === "open") {
      log.success("Your connection was successful with Starlights 🌟");
    }
  });

  client.ev.on("messages.upsert", async ({ messages }) => {
    try {
      let m = messages[0];
      if (!m.message) return;
      m.message =
        Object.keys(m.message)[0] === "ephemeralMessage"
          ? m.message.ephemeralMessage.message
          : m.message;
      if (m.key && m.key.remoteJid === "status@broadcast") return;
      m = smsg(client, m);
      require("./main")(client, m, messages);
    } catch (err) {
      console.log(err);
    }
  });

  client.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      const decode = jidDecode(jid) || {};
      return decode.user && decode.server
        ? decode.user + "@" + decode.server
        : jid;
    }
    return jid;
  };

  client.ev.on("creds.update", saveCreds);
}

startBot();
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.yellowBright(`The file was updated ${__filename}`));
  delete require.cache[file];
  require(file);
});

