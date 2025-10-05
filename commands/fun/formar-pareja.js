
// Autor original: china
// Adaptado por: Starlights

module.exports = {
  command: ["formarpareja5"],
  description: "Forma las 5 mejores parejas del grupo de manera aleatoria",
  category: "fun",
  isGroup: true,
  admin: false,
  botAdmin: false,
  run: async (client, m, { groupMetadata }) => {
    try {
      const ps = groupMetadata.participants.map((p) => p.id);

      if (ps.length < 10)
        return m.reply("😿 No hay suficientes participantes en el grupo para formar 5 parejas.");

      const toM = (jid) => "@" + jid.split("@")[0];
      const pickUnique = (arr, n) => {
        let res = [];
        while (res.length < n) {
          const r = arr[Math.floor(Math.random() * arr.length)];
          if (!res.includes(r)) res.push(r);
        }
        return res;
      };

      const [a, b, c, d, e, f, g, h, i, j] = pickUnique(ps, 10);

      const text = `*😍_Las 5 mejores parejas del grupo_😍*

*_1.- ${toM(a)} y ${toM(b)}_*
- Esta pareja está destinada a estar junta 💙

*_2.- ${toM(c)} y ${toM(d)}_*
- Esta pareja son dos pequeños tortolitos enamorados ✨

*_3.- ${toM(e)} y ${toM(f)}_*
- Ufff y qué decir de esta pareja, ya hasta familia deberían tener 🤱🧑‍🍼

*_4.- ${toM(g)} y ${toM(h)}_*
- Estos ya se casaron en secreto 💍

*_5.- ${toM(i)} y ${toM(j)}_*
- Esta pareja se está de luna de miel ✨🥵😍❤️*`;

      await m.reply(text, null, { mentions: [a, b, c, d, e, f, g, h, i, j] });
    } catch (e) {
      console.error("[ERROR FORMAR PAREJAS]", e);
      await m.reply("😿 Ocurrió un error al formar las parejas.");
    }
  },
};
