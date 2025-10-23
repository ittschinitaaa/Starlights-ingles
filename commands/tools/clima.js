// código creado por china
// github.com/ittschinitaaa
const axios = require('axios');

module.exports = {
  command: ["clima", "tiempo"],
  description: "Displays the current weather of a city or country",
  category: "tools",
  run: async (client, m, args) => {
    if (!args[0]) return m.reply("❌ Enter the name of your Country or City.");

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args[0]}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`);
      const res = response.data;
      const wea = `
「 📍 」PLACE: ${res.name}
「 🗺️ 」COUNTRY: ${res.sys.country}
「 🌤️ 」TIME: ${res.weather[0].description}
「 🌡️ 」TEMPERATURE: ${res.main.temp}°C
「 💠 」MINIMUM TEMPERATURE: ${res.main.temp_min}°C
「 📛 」MAXIMUM TEMPERATURE: ${res.main.temp_max}°C
「 💦 」HUMIDITY: ${res.main.humidity}%
「 🌬️ 」WIND: ${res.wind.speed}km/h
`.trim();

      await client.sendMessage(m.chat, { text: wea }, { quoted: m });
    } catch (e) {
      console.error(e);
      m.reply("⚠️ Error! No results found, please try an existing country or city..");
    }
  }
};
