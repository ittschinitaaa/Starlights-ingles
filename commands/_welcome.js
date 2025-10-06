// plugins/_welcome.js
module.exports = async (client, m, action, participants) => {
  const imageUrl = 'https://i.ibb.co/your-image.jpg'; // Cambia por tu imagen
  for (let user of participants) {
    const name = user.split('@')[0];
    if (action === 'add') {
      await client.sendMessage(
        m.chat,
        { image: { url: imageUrl }, caption: `👋 Bienvenid@ al grupo, @${name}! 🎉`, mentions: [user] }
      );
    } else if (action === 'remove') {
      await client.sendMessage(
        m.chat,
        { image: { url: imageUrl }, caption: `😢 @${name} se ha ido del grupo. ¡Te extrañaremos!`, mentions: [user] }
      );
    }
  }
};
