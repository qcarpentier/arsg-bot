const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  // Delete the command message
  message.delete();

  // Build the Markdown Rich Embed
  const rulesEmbed = new Discord.RichEmbed()
    .setTitle(
      "Pour que cet endroit reste cordial, vous êtes tenus de respecter quelques **règles élémentaires.**"
    )
    .setColor("#F8F096")
    .addField(
      "**[1]**",
      "Écrivez dans un français correct, sans spam et sans flood."
    )
    .addField("**[2]**", "Respectez les autres élèves et leurs opinions.")
    .addField(
      "**[3]**",
      "N'envoyez pas de photo d'un élève **sans son accord**, qu'elle soit drôle ou non."
    )
    .addField(
      "**[4]**",
      "L'envoi de tout matériel nuisible, tel que les virus, est formellement interdit."
    )
    .addField(
      "**[5]**",
      "Respectez la loi et la sensibilité d'autrui (pas de piratage, de pornographie, de gore, etc.)."
    );

  // Send the Rich Embed as a private message to the user
  message.channel.send(rulesEmbed);
};

module.exports.config = {
  command: "rules"
};
