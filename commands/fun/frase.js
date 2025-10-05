
// Autor original: china
// Adaptado por: Starlights

module.exports = {
  command: ["frase"],
  description: "Envía una frase motivacional o inspiradora aleatoria",
  category: "fun",
  isGroup: true,
  admin: false,
  botAdmin: false,
  run: async (client, m, args) => {
    try {
      if (!global.frases || global.frases.length === 0)
        return m.reply("😿 No hay frases disponibles.");

      // mensaje de espera
      await m.reply("📝 Buscando una frase inspiradora, espere un momento...");

      // seleccionar frase aleatoria
      const frase = pickRandom(global.frases);

      // enviar frase
      const mensaje = `*┏━─💭─━┓*\n\n❥ "${frase}"\n\n*┗━─💭─━┛*`;
      await m.reply(mensaje);
    } catch (e) {
      console.error("[ERROR FRASE]", e);
      await m.reply("😿 Ocurrió un error al enviar la frase.");
    }
  },
};

// helper para seleccionar aleatorio
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// lista de frases
global.frases = [
  "Recuerda que no puedes fallar en ser tú mismo (Wayne Dyer)",
  "Siempre es temprano para rendirse (Jorge Álvarez Camacho)",
  "Sólo una cosa convierte en imposible un sueño: el miedo a fracasar (Paulo Coelho)",
  "Lo que haces hoy puede mejorar todos tus mañanas (Ralph Marston)",
  "Cáete siete veces y levántate ocho (Proverbio japonés)",
  "Nada sucede hasta que algo se mueve (Albert Einstein)",
  "La felicidad está escondida en la sala de espera de la felicidad (Eduard Punset)",
  "El verdadero buscador crece y aprende, y descubre que siempre es el principal responsable de lo que sucede (Jorge Bucay)",
  "La vida comienza al final de la zona de confort (Neale Donald Walsch)",
  "La confianza en sí mismo es el primer secreto del éxito (Ralph Waldo Emerson)",
  "No hay camino para la paz, la paz es el camino. (Mahatma Gandhi)",
  "La vida es lo que pasa mientras estás ocupado haciendo otros planes. (John Lennon)",
  "La vida es un 10% lo que me ocurre y un 90% cómo reacciono a ello. (Charles R. Swindoll)",
  "El único modo de hacer un gran trabajo es amar lo que haces. (Steve Jobs)",
  "No importa qué tan lento vayas, siempre y cuando no te detengas. (Confucio)",
  "No te preocupes si no tienes éxito, siempre puedes ser un buen ejemplo de cómo no hacerlo.",
  "Si la vida te da limones, pide sal y tequila.",
  "La risa es la distancia más corta entre dos personas.",
  "La vida es corta, haz que cuente.",
  "La vida es una aventura, atrévete a vivirla."
];
