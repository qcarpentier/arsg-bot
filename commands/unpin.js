module.exports.run = async (bot, message, args) => {
  // Get administrator role
  const administratorRole = message.guild.roles.find(
    role => role.name === "Administrator"
  );
  // Get moderator role
  const moderatorRole = message.guild.roles.find(
    role => role.name === "Moderator"
  );
  const channel = message.channel;

  // Verify if sender has contributor role
  if (message.member.roles.has(administratorRole.id) || message.member.roles.has(moderatorRole.id)) {
    // Delete the command message
    message.delete();

    // Fetch all channel pinned messages
    channel.fetchPinnedMessages().then(pinnedMessages => {
      channel
        .bulkDelete(pinnedMessages)
        .catch(error => channel.send(`Error: ${error}`));
    });
  } else {
    channel.send("Vous n'avez pas le droit d'utiliser cette commande.");
  }
};

module.exports.config = {
  command: "unpin"
};
