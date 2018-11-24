const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  if (args.length <= 1) {
    let errorembed = new Discord.RichEmbed()
      .setColor("e74c3c") // Generate random color
      .setTitle("~ Erreur, paramêtres manquants")
      .setDescription('Vous devez spécifier **deux** paramètre pour la commande **!setactivity**')
      .setTimestamp(new Date()) //Get date
      .setFooter(`Exception levée par ${message.author.tag}`);
    return message.channel.send(errorembed);
  }
  else
  { // Type possible : Streaming, Listening, Watching, Playing
    if (args[1].length === 0) { args[1] = "playing" } //Exception fix (Cannot read property 'length' of undefined)
    args[1] = args[1].toLowerCase()
    if (args[1] === "playing" || args[1] === "streaming" || args[1] === "listening" || args[1] === "watching") {
      let activityembed = new Discord.RichEmbed()
        .setColor("0x0080ff") // Generate random color
        .setTitle("~ Changement de l\'activité du bot")
        .setDescription('Bot activity **=>** ' + args[0] + '; Type => ' + '**' + args[1].toUpperCase() + '**')
        .setTimestamp(new Date()) //Get date
        .setFooter(`Demandé par ${message.author.tag}`);
      let typeactivity = args[1].toUpperCase()
      bot.user.setActivity(args, { type: typeactivity });
      return message.channel.send(activityembed);
    }
    else {
      let activityembed = new Discord.RichEmbed()
        .setColor("0x0080ff") // Generate random color
        .setTitle("~ Changement de l\'activité du bot")
        .setDescription('Bot activity **=>** ' + args[0] + ' ; Type => **PLAYING**')
        .setTimestamp(new Date()) //Get date
        .setFooter(`Demandé par ${message.author.tag}`);
      let typeactivity = "PLAYING"
      bot.user.setActivity(args, { type: typeactivity });
      return message.channel.send(activityembed);
    }
  }
};

module.exports.config = {
  command: "setactivity"
};
