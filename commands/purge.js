require("colors");

module.exports.run = async (bot, message, args) => {
  // Get Administrator role
  const administratorRole = message.guild.roles.find(
    role => role.name === "Administrator"
  );
  const channel = message.channel;
  let purgeNumber = 50;

  if (args.length > 0) {
    purgeNumber = message.content.split(" ");
    // Remove '!unpin'
    purgeNumber.shift();

    // Check if purgeNumber is actually a number
    if (isNaN(purgeNumber)) {
      return message.author.send(
        "Le nombre de messages à purger n'est pas correct."
      );
    }
  }

  // Verify if sender has administrator role
  if (message.member.roles.has(administratorRole.id)) {
    // Delete the command message
    message.delete();

    // Fetch all channel messages
    channel.fetchMessages({ limit: purgeNumber }).then(messages => {
      messages.forEach(msg =>
        msg
          .delete()
          .then(e => console.log(`!purge: deleted message from ${e.author.username}`.red))
      );
    });
  } else {
    channel.send("Vous n'avez pas le droit d'utiliser cette commande.");
  }
};

module.exports.config = {
  command: "purge"
};
