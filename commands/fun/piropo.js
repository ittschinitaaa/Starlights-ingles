
// Autor original: china
// Adaptado por: Starlights

module.exports = {
  command: ["piropo"],
  description: "Envía un piropo aleatorio y divertido a alguien del grupo 😏",
  category: "fun",
  isGroup: true,
  admin: false,
  botAdmin: false,
  run: async (client, m, args) => {
    try {
      if (!global.piropo || global.piropo.length === 0) {
        return m.reply("😿 No hay piropos disponibles.");
      }

      // seleccionar objetivo
      let userName;
      if (m.mentionedJid && m.mentionedJid.length > 0) {
        userName = await client.getName
          ? await client.getName(m.mentionedJid[0])
          : m.mentionedJid[0].split("@")[0];
      } else if (m.quoted) {
        userName = await client.getName
          ? await client.getName(m.quoted.sender)
          : m.quoted.sender.split("@")[0];
      } else {
        userName = m.sender.split("@")[0];
      }

      // enviar mensaje de espera
      await m.reply(`💌 Buscando un piropo para ${userName}, espere un momento...`);

      // elegir piropo aleatorio
      const piropo = pickRandom(global.piropo);

      // enviar piropo final
      const mensaje = `*┏━─💘─━┓*\n\n❥ "${piropo}"\n\n*┗━─💘─━┛*`;
      await m.reply(mensaje);
    } catch (e) {
      console.error("[ERROR piropo]", e);
      await m.reply("😿 Ocurrió un error al enviar el piropo.");
    }
  },
};

// helper para seleccionar aleatorio
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// lista de piropos (igual a la que enviaste)
global.piropo = [
  "Si tu cuerpo fuera cárcel y tus labios cadena, qué bonito lugar para pasar mi condena.",
  "!Lo tuyo es un dos por uno, además de guapa eres simpática!",
  "Fíjate como es la ciencia que ahora hasta hacen bombones que andan.",
  "Por la luna daría un beso, daría todo por el sol, pero por la luz de tu mirada, doy mi vida y corazón.",
  "Si yo fuera un avión y tu un aeropuerto, me la pasaría aterrizando por tu hermoso cuerpo.",
  "Tantas estrellas en el espacio y ninguna brilla como tú.",
  "Me gusta el café, pero prefiero tener-té.",
  "No eres Google, pero tienes todo lo que yo busco.",
  "Mis ganas de ti no se quitan, se acumulan.",
  "Te regalo esta flor, aunque ninguna será jamás tan bella como tú.",
  "Cuando te multen por exceso de belleza, yo pagaré tu fianza.",
  "Si cada gota de agua sobre tu cuerpo es un beso, entonces quiero convertirme en aguacero.",
  "Estás como para invitarte a dormir, y no dormir.",
  // ... (agrega los demás piropos de tu lista aquí)
];
