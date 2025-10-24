const axios = require('axios')
const cheerio = require('cheerio')

module.exports = {
  command: ["pinterest", "pin"],
  description: "Busca imágenes o videos en Pinterest",
  category: "downloader",
  run: async (client, m, args, { prefix }) => {
    const text = args.join(" ")
    if (!text) return client.sendMessage(m.chat, { text: `❀ Por favor, ingresa lo que deseas buscar por Pinterest.` }, { quoted: m })
    try {
      await client.sendMessage(m.chat, { react: { text: "🕒", key: m.key } })

      if (text.includes("https://")) {
        let i = await dl(text)
        const isVideo = i.download?.includes(".mp4")
        await client.sendMessage(
          m.chat,
          { [isVideo ? "video" : "image"]: { url: i.download }, caption: i.title },
          { quoted: m }
        )
      } else {
        const results = await pins(text)
        if (!results.length) return client.sendMessage(m.chat, { text: `ꕥ No se encontraron resultados para "${text}".` }, { quoted: m })

        const medias = results.slice(0, 15).map(img => ({ type: 'image', data: { url: img.image_large_url } }))
        await client.sendMessage(
          m.chat,
          { image: { url: medias[0].data.url }, caption: `\`🌷 Pinterest - Search 🌷\`\n\n🔎 Búsqueda » "${text}"\n📝 Resultados » ${medias.length}` },
          { quoted: m }
        )
      }
      await client.sendMessage(m.chat, { react: { text: "✅", key: m.key } })
    } catch (e) {
      await client.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
      client.sendMessage(
        m.chat,
        { text: `⚠︎ Se ha producido un problema.\n> Usa *${prefix}report* para informarlo.\n\n${e}` },
        { quoted: m }
      )
    }
  }
}

async function dl(url) {
  try {
    let res = await axios.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }).catch(e => e.response)
    let $ = cheerio.load(res.data)
    let tag = $('script[data-test-id="video-snippet"]')
    if (tag.length) {
      let result = JSON.parse(tag.text())
      return { title: result.name, download: result.contentUrl }
    } else {
      let json = JSON.parse($("script[data-relay-response='true']").eq(0).text())
      let result = json.response.data["v3GetPinQuery"].data
      return { title: result.title, download: result.imageLargeUrl }
    }
  } catch {
    return { msg: "Error, inténtalo de nuevo más tarde" }
  }
}

async function pins(judul) {
  const link = `https://id.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(judul)}%26rs%3Dtyped&data=%7B%22options%22%3A%7B%22query%22%3A%22${encodeURIComponent(judul)}%22%2C%22redux_normalize_feed%22%3Atrue%7D%2C%22context%22%3A%7B%7D%7D`
  const headers = {
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'user-agent': 'Mozilla/5.0'
  }
  try {
    const res = await axios.get(link, { headers })
    if (res.data?.resource_response?.data?.results) {
      return res.data.resource_response.data.results.map(item => {
        if (item.images) return { image_large_url: item.images.orig?.url || null }
        return null
      }).filter(img => img !== null)
    }
    return []
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}
