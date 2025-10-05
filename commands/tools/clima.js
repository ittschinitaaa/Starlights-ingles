// código creado por china
// github.com/ittschinitaaa
const axios = require('axios');

module.exports = {
  command: ["clima", "tiempo"],
  description: "Muestra el clima actual de una ciudad o país",
  category: "tools",
  run: async (client, m, args) => {
    if (!args[0]) return m.reply("❌ Ingrese el nombre de su País o Ciudad.");

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args[0]}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`);
      const res = response.data;
      const wea = `
「 📍 」LUGAR: ${res.name}
「 🗺️ 」PAIS: ${res.sys.country}
「 🌤️ 」TIEMPO: ${res.weather[0].description}
「 🌡️ 」TEMPERATURA: ${res.main.temp}°C
「 💠 」TEMPERATURA MINIMA: ${res.main.temp_min}°C
「 📛 」TEMPERATURA MAXIMA: ${res.main.temp_max}°C
「 💦 」HUMEDAD: ${res.main.humidity}%
「 🌬️ 」VIENTO: ${res.wind.speed}km/h
`.trim();

      await client.sendMessage(m.chat, { text: wea }, { quoted: m });
    } catch (e) {
      console.error(e);
      m.reply("⚠️ Error! No se encontraron resultados, intente con un país o ciudad existente.");
    }
  }
};
