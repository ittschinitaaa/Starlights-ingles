const moment = require("moment");

module.exports = {
  command: ["ping"],
  description: "Checks the connection and displays bot info",
  category: "general",
  run: async (client, m, args, { prefix }) => {
    const start = Date.now();
    const tempMsg = await client.sendMessage(
      m.key.remoteJid,
      { text: "⏰ Loading ping..." },
      { quoted: m },
    );
    const latency = Date.now() - start;

    const up = process.uptime(),
      h = Math.floor(up / 3600),
      min = Math.floor((up % 3600) / 60),
      s = Math.floor(up % 60);
    const ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

    const userTag = m.pushName || "Guest";
    const sender = m.sender.replace(/@.+/, "");

    const msg = `Hello, ${userTag}

🌟 \`Ping Status\`

🕑 \`Ping:\` ${latency} ms
⏰ \`Uptime:\` [ ${h}h ${min}m ${s}s ]
💻 \`RAM usada:\` ${ram} MB
👤 \`Usuario ID:\` @${sender}`.trim();

    await client.sendMessage(
      m.chat,
      { text: msg, mentions: [m.sender] },
      { quoted: tempMsg },
    );
  },
};
