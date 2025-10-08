const { createConnection } = require("./baileys");
const { createSessionDir } = require("./sessionHandler");
const qrcode = require("qrcode");

async function startSubBot(number, sendFunc, qr = false) {
  const sessionDir = createSessionDir(number);
  const sock = await createConnection(sessionDir, `Starlights-SubBot`);

  if (qr) {
    sock.ev.on("connection.update", async (update) => {
      const { qr: qrCode, connection } = update;
      if (qrCode) {
        const qrImage = await qrcode.toBuffer(qrCode);
        await sendFunc(qrImage);
      }
      if (connection === "open") {
        console.log(`[✅] Sub-Bot (${number}) conectado correctamente`);
      }
    });
  }

  sock.ev.on("creds.update", () => console.log(`[💾] Credenciales actualizadas (${number})`));

  return sock;
}

module.exports = { startSubBot };
