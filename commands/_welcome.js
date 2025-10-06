// Bienvenida y despedida para Starlights
// github: github.com/miaoficial02/Starlights

module.exports = {
  event: 'group-participants', // Se activa cuando alguien entra o sale
  async run(client, m) {
    try {
      const { participants, action, chat } = m; // participants: array de usuarios, action: 'add' o 'remove'
      
      for (let user of participants) {
        // Obtener nombre del usuario
        let name = '';
        try {
          const contact = await client.onWhatsApp(user);
          name = contact && contact[0]?.notify ? contact[0].notify : user.split('@')[0];
        } catch {
          name = user.split('@')[0];
        }

        // Obtener foto de perfil
        let pp = 'https://telegra.ph/file/8b5f4b0b7f3d3b0b0b0b0.jpg'; // URL por defecto
        try {
          pp = await client.profilePictureUrl(user, 'image');
        } catch {}

        // Mensajes
        let msg = '';
        if (action === 'add') {
          msg = `🌟 ¡Bienvenido al grupo, ${name}! 🎉\n\nEsperamos que la pases increíble aquí.`;
        } else if (action === 'remove') {
          msg = `😢 ${name} se ha salido del grupo. ¡Hasta pronto!`;
        }

        // Enviar mensaje con imagen
        await client.sendMessage(chat, {
          image: { url: pp },
          caption: msg
        });
      }
    } catch (err) {
      console.error('Error en evento de bienvenida/despedida:', err);
    }
  }
};
