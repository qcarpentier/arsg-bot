module.exports.run = async (bot, message, args) => {
  // Get contributore role
  const contributorRole = message.guild.roles.find(
    role => role.name === "Contributor"
  );
  const channel = message.channel;

  // Verify if sender has contributor role
  if (message.member.roles.has(contributorRole.id)) {
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
