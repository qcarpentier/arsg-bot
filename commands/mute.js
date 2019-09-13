const Discord = require("discord.js");
require("colors");

module.exports.run = async (bot, message, args) => {
  // Get Administrator role
  const administratorRole = message.guild.roles.find(
    role => role.name === "Administrator"
  );
  // Get Moderator role
  const moderatorRole = message.guild.roles.find(
    role => role.name === "Moderator"
  );

  // Set an Error RichEmbed
  const setError = message => {
    const memberName = member.displayName;
    const errorEmbed = new Discord.RichEmbed()
      .setColor("e74c3c")
      .setTitle(`Erreur: ${message}`)
      .setTimestamp(new Date()) // Get date
      .setFooter(`Exception enregistrée par ${memberName}`);
    return errorEmbed;
  };
  
  const member = message.member;
  const author = message.author;
  const hourRegex = /^\d+(\.\d+)?$/;
  // Get the member to be muted (actually, the first mentioned member)
  const memberToBeMuted = message.mentions.members.first();

  // Delete the command message
  message.delete();

  // Verify if sender has Administrator or Moderator role
  if (
    !member.roles.has(administratorRole.id) &&
    !member.roles.has(moderatorRole.id)
  ) {
    const errorEmbed = setError(
      "vous n'avez pas le droit d'effectuer cette commande."
    );
    return author.send(errorEmbed);
  } else if (!memberToBeMuted) {
    const errorEmbed = setError(
      "vous devez mentionner le **nom de l'élève** pour la commande `!mute`."
    );
    return author.send(errorEmbed);
  } else if (args < 2 || !hourRegex.test(args[1])) {
    const errorEmbed = setError(
      "vous déterminer la période **en heure** pour la commande `!mute`."
    );
    return author.send(errorEmbed);
  } else {
    // Get Muted role
    const mutedRole = message.guild.roles.find(role => role.name === "Muted");

    // Set Muted role
    if (!memberToBeMuted.roles.has(mutedRole.id)) {
      memberToBeMuted.addRole(mutedRole.id);
      message.channel.send(
        `${memberToBeMuted} vient d'être rendu au silence pour une durée de **${
          args[1]
        } heure(s).**`
      );
    }

    setTimeout(() => {
      if (memberToBeMuted.roles.has(mutedRole.id))
        memberToBeMuted.removeRole(mutedRole.id);
    }, args[1] * 60 * 60 * 1000);
  }
};

module.exports.config = {
  command: "mute"
};
