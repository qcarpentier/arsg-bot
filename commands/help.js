const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  // Build the Help Rich Embed
  const helpEmbed = new Discord.RichEmbed()
    .setTitle("Besoin d'aide? Vous pouvez toujours compter sur **l'ARSG Bot!**")
    .setDescription(
      "Pour effectuer une **commande** sur le serveur, il vous suffit simplement de faire `!` suivi du nom de la commande:"
    )
    .setColor("#F8F096")
    .addField("`!help`", "Affiche **l'aide** du serveur.")
    .addField("`!rules`", "Affiche les **règles générales** du serveur.")
    .addField(
      "`!sethomework <type> <date> <cours> <description>`",
      "Crée et épingle **un devoir, une interro, une prépa, un examen** ainsi que sa description. (uniquement dans le channel #homework)"
    )
    .addField(
      "`!setschedule <jour> <H + heure> <cours>`",
      "Ajoute ton **horaire** pour n'importe quel jour **de la semaine** ainsi que l'heure de cours et le cours pour que **toute ta classe** puissent le voir !"
    )
    .addField(
      "`!schedule <jour>`",
      "Visualise **ton horaire** de cours ! "
    )
    .addField(
      "`!markdown`",
      "Affiche une liste détaillée sur le **Markdown**. (PS: va voir, c'est stylé)"
    )
    .addField(
      "`!google <recherche>`",
      "Besoin de **rechercher** quelque chose? Ton meilleur pote Google est toujours là pour t'épauler."
    )
    .addField(
      "`!googleimg <recherche>`",
      "Besoin de **visualiser** quelque chose? Google Image sera toujours là pour toi."
    );

  // Send the Rich Embed as a private message to the user
  message.author.send(helpEmbed);

  // Delete the command message
  message.delete();
};

module.exports.config = {
  command: "help"
};
