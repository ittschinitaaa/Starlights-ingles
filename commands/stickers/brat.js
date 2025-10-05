// Código creado por china
// github: github.com/ittschinitaaa
import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

module.exports = {
    command: ["brat", "tsticker"],
    description: "Crea un sticker solo con texto y fondo blanco",
    category: "sticker",
    isGroup: false,
    run: async (client, m, args) => {
        if (!args.length) return m.reply("❌ Escribe un texto para generar el sticker.");

        const text = args.join(" ");

        const canvas = createCanvas(512, 512);
        const ctx = canvas.getContext('2d');

        // Fondo blanco
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 512, 512);

        // Texto negro centrado
        ctx.fillStyle = 'black';
        ctx.font = 'bold 50px Sans';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const lines = text.match(/.{1,12}/g);
        lines.forEach((line, i) => {
            ctx.fillText(line, 256, 256 + (i - lines.length/2)*60);
        });

        // Guardar temporal
        const buffer = canvas.toBuffer('image/png');
        const tmpFile = path.join('./tmp', `sticker-${Date.now()}.png`);
        fs.writeFileSync(tmpFile, buffer);

        // Enviar sticker
        await client.sendMessage(m.chat, { sticker: fs.readFileSync(tmpFile) }, { quoted: m });

        // Eliminar temporal
        fs.unlinkSync(tmpFile);
    }
};
