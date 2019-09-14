const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  // Delete the command message
  message.delete();

  // Build the Markdown Rich Embed
  const markdownEmbed = new Discord.RichEmbed()
    .setTitle("Donnez un peu de vie à vos conversations quotidiennes!")
    .setDescription(
      "Le **Markdown** est un système de formatage qui vous aidera à faire ressortir vos phrases. Ajoutez juste quelques caractères autour votre texte et le tour est joué!"
    )
    .setColor("#F8F096")
    .addField("*italique*", "`*italique*` **ou** `_italique_`")
    .addField("__*italique souligné*__", "`__*italique souligné*__`")
    .addField("**gras**", "`**gras**`")
    .addField("__**gras souligné**__", "`__**gras souligné**__`")
    .addField("***gras italique***", "`***gras italique***`")
    .addField(
      "__***gras souligné italique***__",
      "`__***gras souligné italique***__`"
    )
    .addField("__souligné__", "`__souligné__`")
    .addField("~~barré~~", "`~~barré~~`")
    .addField("`code`", "` ``code`` `")
    .addField(
      "```bloc \nde code \nde plusieurs lignes```",
      "` ````bloc \nde code \nde plusieurs lignes```` `"
    )
    .addField("||spoilers||", "`||spoilers||`")
    .addField("> Une ligne de block quote", "`> Une ligne de block quote`")
    .addField(
      ">>> Plusieurs \nlignes \nde block quote",
      "`>>> Plusieurs \nlignes \nde block quote`"
    );

  // Send the Rich Embed as a private message to the user
  message.author.send(markdownEmbed);
};

module.exports.config = {
  command: "markdown"
};
