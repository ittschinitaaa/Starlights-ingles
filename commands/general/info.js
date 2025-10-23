const os = require("os");
const pkg = require("../../package.json");

module.exports = {
  command: ["info"],
  category: "general",
  run: async (client, m, args, from) => {
    const up = process.uptime(),
      h = Math.floor(up / 3600),
      min = Math.floor((up % 3600) / 60),
      s = Math.floor(up % 60);
    const cpu = os.cpus()[0]?.model.trim() || "Desconocido",
      cores = os.cpus().length;
    const mem = [
      (os.freemem() / 1024 / 1024).toFixed(0),
      (os.totalmem() / 1024 / 1024).toFixed(0),
    ];
    const platform = `${os.platform()} ${os.release()} (${os.arch()})`;
    const nodeV = process.version;
    const host = os.hostname();
    const shell = process.env.SHELL || process.env.COMSPEC || "desconocido";
    const now = new Date().toLocaleString("en-US", {
      timeZone: "America/Argentina/Buenos_Aires",
      hour12: false,
    });

    const info = `𝐒𝐭𝐚𝐫𝐥𝐢𝐠𝐡𝐭𝐬 - 𝐂𝐡𝐢𝐧𝐚 🇨🇳

*Versión:* ${pkg.version}
*Author:* 𝐂𝐡𝐢𝐧𝐚 | 𝐒𝐭𝐚𝐫𝐥𝐢𝐠𝐡𝐭𝐬
*Uptime:* ${h}h ${min}m ${s}s
*Platform:* ${platform}
*Node.js:* ${nodeV}
*Host:* ${host}
*Shell:* ${shell}

*CPU:* ${cpu} (${cores} núcleos)
*Memoria:* ${mem[0]} MiB libre / ${mem[1]} MiB total

*Date & Time:* ${now}`;

    await client.sendMessage(
      m.chat,
      {
        image: { url: "https://files.catbox.moe/sklz18.png" },
        caption: info,
      },
      { quoted: m },
    );
  },
};
