// codigo creado por China
// github: github.com/ittschinitaaa

module.exports = {
  command: ["nombreninja"],
  description: "Convierte un nombre a estilo ninja",
  category: "fun",
  isGroup: true,
  isAdmin: false,
  botAdmin: false,
  use: "<texto>",
  run: async (client, m, { text }) => {
    const emoji = '🔍';

    if (!text) {
      return client.reply(m.chat, `${emoji} Por favor, ingresa tu nombre junto al comando.`, m);
    }

    client.reply(m.chat, `${emoji} Buscando el Nombre, espere un momento...`, m);

    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text;

    const mapa = {
      'a': 'ka',  'b': 'tsu', 'c': 'mi',  'd': 'te',
      'e': 'ku',  'f': 'hi',  'g': 'ji',  'h': 'ri',
      'i': 'ki',  'j': 'zu',  'k': 'me',  'l': 'ta',
      'm': 'rin', 'n': 'to',  'o': 'mo',  'p': 'no',
      'q': 'ke',  'r': 'shi', 's': 'ari', 't': 'chi',
      'u': 'do',  'v': 'ru',  'w': 'mei','x': 'na',
      'y': 'fu',  'z': 'mori'
    };

    const resultado = teks.replace(/[a-z]/gi, v => mapa[v.toLowerCase()] || v);

    m.reply(resultado);
  },
};
