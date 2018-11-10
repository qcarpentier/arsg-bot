const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    let msgping1 = new Date();
    let botping = new Date() - message.createdAt;
    let msgping2 = new Date() - msgping1;
    let pingembed = new Discord.RichEmbed()
        .setColor("RANDOM") // Generate random color 
        .addField('API Ping : ', Math.floor(bot.ping) + ' **ms**') // Calculate ms ping of api call
        .addField('Bot Ping : ', Math.floor(botping) + ' **ms**') // Calculate ping of bot call
        .addField('Message Ping : ', '~' + Math.round(msgping2) + ' **ms**') // Calculate ping of message
        .setTimestamp(new Date()) //Get date
        .setFooter(`Demandé par ${message.author.tag}`);
    return message.channel.send(pingembed);
};

module.exports.config = {
  command: "ping"
};
