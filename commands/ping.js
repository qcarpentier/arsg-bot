const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const member = message.member.displayName;
  const startTime = new Date();

  message.channel.send("pong!").then(msg => {
    const endTime = new Date();
    const apiPing = Math.round(endTime - startTime);

    const pingEmbed = new Discord.RichEmbed()
      // Generate random color
      .setColor("RANDOM")
      // Calculate ms ping of API call
      .addField("API Ping : ", apiPing + " ms")
      // Call the actual bot ping
      .addField("Bot Ping : ", bot.ping + " ms")
      .setFooter(`Demandé par ${member}`);
    return msg.channel.send(pingEmbed);
  });
};

module.exports.config = {
  command: "ping"
};
