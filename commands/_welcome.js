// _welcome.js
// Código adaptado para Starlights
// GitHub: github.com/ittschinitaaa

module.exports = async (client, m, action, participants) => {
    try {
        const grupo = m.chat;
        const groupMetadata = await client.groupMetadata(grupo).catch(() => null);
        const groupName = groupMetadata?.subject || 'este grupo';

        // Imagen de bienvenida/despedida (cambia la URL o path aquí)
        const welcomeImage = 'https://telegra.ph/file/abc123ejemplo.png'; // Cambia la URL a la que quieras
        const goodbyeImage = 'https://telegra.ph/file/xyz123ejemplo.png'; // Cambia la URL a la que quieras

        for (const userId of participants) {
            // Intentamos obtener el nombre del usuario
            let userName;
            try {
                const contact = await client.onWhatsApp(userId);
                userName = contact && contact[0]?.notify ? contact[0].notify : userId.split("@")[0];
            } catch {
                userName = userId.split("@")[0];
            }

            if (action === 'add') {
                const text = `🎉 ¡Bienvenid@, @${userName}!\nTe damos la bienvenida a *${groupName}* 💖`;
                await client.sendMessage(
                    grupo,
                    { image: { url: welcomeImage }, caption: text, mentions: [userId] },
                    { quoted: m }
                );
            } else if (action === 'remove') {
                const text = `😢 @${userName} ha salido de *${groupName}*.\n¡Te extrañaremos!`;
                await client.sendMessage(
                    grupo,
                    { image: { url: goodbyeImage }, caption: text, mentions: [userId] },
                    { quoted: m }
                );
            }
        }
    } catch (err) {
        console.error('Error en plugin de bienvenida/despedida:', err);
    }
};
