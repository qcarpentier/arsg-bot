const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const member = message.member.displayName;
  const startTime = new Date();

  message.channel.send("pong!").then(message => {
    const endTime = new Date();
    const apiPing = Math.round(endTime - startTime);

    let pingEmbed = new Discord.RichEmbed()
      .setColor("RANDOM") // Generate random color 
      .addField('API Ping : ', apiPing + ' ms') // Calculate ms ping of API call
      .addField('Bot Ping : ', bot.ping + ' ms') // Call the actual bot ping
      .setFooter(`Demandé par ${member}`);
    return message.channel.send(pingEmbed);
  })
};

module.exports.config = {
  command: "ping"
};
