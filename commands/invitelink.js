const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {

  //Get admin and moderator roles
  const administratorRole = message.guild.roles.find(
    role => role.name === "Administrator"); 
  const moderatorRole = message.guild.roles.find(
    role => role.name === "Moderator");
  

  // Check if message's member is moderator or administrator.
  if (message.member.roles.has(administratorRole.id) || (message.member.roles.has(moderatorRole.id))){
      message.channel.send("Lien d'invitation: https://discord.gg/y4vTKAR");
  } else {
      let errorEmbed = new Discord.RichEmbed()
      .setColor("e74c3c")
      .setTitle("Erreur")
      .setDescription('Vous n\'avez pas la permission d\'effectuer cette commande.')
      .setTimestamp('*' + new Date() + '*')
      return message.author.send(errorEmbed);
  }
};

module.exports.config = {
  command: "invitelink"
};
