const Discord = require("discord.js");

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
  const setEmbed = (title, description = "") => {
    const errorEmbed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle(title)
      .setDescription(description)
      .setTimestamp(new Date());
    return errorEmbed;
  };

  const member = message.member;
  const author = message.author;

  // Delete the command message
  message.delete();

  // Verify if sender has Administrator or Moderator role
  if (
    !member.roles.has(administratorRole.id) &&
    !member.roles.has(moderatorRole.id)
  ) {
    const errorEmbed = setEmbed(
      "Vous n'avez pas le droit d'effectuer cette commande.",
      ""
    );
    return author.send(errorEmbed);
  }

  if (args.length <= 1) {
    const errorEmbed = setEmbed(
      "Erreur: la commande `!setactivity` a besoin de **deux paramètres**.",
      "Exemple: `!setactivity watching youtube`"
    );
    return message.author.send(errorEmbed);
  } else {
    // Activity type should be "PLAYING", "STREAMING", "LISTENING" or "WATCHING"
    const activityType = args[0].toUpperCase();

    // Remove the activity type from args
    args.shift();

    // Capitalize each letter from the args
    for (let i = 0; i < args.length; i++) {
      args[i] = args[i].charAt(0).toUpperCase() + args[i].substr(1);
    }

    // Get a string from the args array
    const activity = args.join(" ");

    if (
      activityType != "PLAYING" &&
      activityType != "STREAMING" &&
      activityType != "LISTENING" &&
      activityType != "WATCHING"
    ) {
      const errorEmbed = setEmbed(
        "Erreur: le type d'activité n'est pas reconnu.",
        "Les types d'activité de la commande `!setactivity` sont:" +
          "\n• PLAYING\n• STREAMING\n• LISTENING\n• WATCHING" +
          "\n\nExemple: `!setactivity watching YouTube`"
      );
      
      return message.author.send(errorEmbed);
    } else {
      const activityEmbed = setEmbed(
        "Changement de l'activité du bot",
        `Type: **${activityType}**, activité: **${activity}** `
      );

      bot.user.setActivity(activity, { type: activityType });
      return message.author.send(activityEmbed);
    }
  }
};

module.exports.config = {
  command: "setactivity"
};
