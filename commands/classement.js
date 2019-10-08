module.exports.run = async (bot, message, args) => {
  message.channel.send(
    "La commande `!classement` n'existe plus! Désormais, utilise `!rank`. :)"
  );

  // Delete the command message
  message.delete();
};

module.exports.config = {
  command: "classement"
};
