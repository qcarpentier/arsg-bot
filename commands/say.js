module.exports.run = async (bot, message, args) => {
    // Get contributore role
    const contributorRole = message.guild.roles.find(
        role => role.name === "Moderator"
    );
    const channel = message.channel;

    // Put all arguments into a string
    let messageToSend = args.join(" ");
    messageToSend = messageToSend.charAt(0).toUpperCase() + messageToSend.slice(1);
  
    // Delete the command message
    message.delete();

    // Verify if sender has contributor role
    if (message.member.roles.has(contributorRole.id)) {
        // Send the message
        channel.send(messageToSend);
    } else {
        // Send wrong permission message
        channel.send("Vous n'avez pas le droit d'utiliser cette commande.");
    }
};
  
module.exports.config = {
    command: "say"
};