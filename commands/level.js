const Discord = require("discord.js");
const User = require("../models/user.model");

module.exports.run = async (bot, message, args) => {
  const channel = message.channel;
  const member = message.member.displayName;

  const levelXp = [
    0,
    1000,
    3000,
    6000,
    10000,
    15000,
    21000,
    28000,
    36000,
    45000
  ];

  User.findOne({ username: member }).then(user => {
    if (user) {
      const totalXp = user.messages * 10;
      let levelUpXp;

      levelXp.some((level) => {
        if (totalXp <= level) {
          return levelUpXp = level - totalXp;
        }
      });

      const levelEmbed = new Discord.RichEmbed()
        .setTitle(`${member} est level ${user.level} !`)
        .setColor("RANDOM")
        .setDescription(`Plus que ${levelUpXp}XP pour level up!`)
        .setFooter(`Demandé par ${message.member.displayName}`);

      channel.send(levelEmbed);
    }
  });
  
  // Delete the command message
  message.delete();
};

module.exports.config = {
  command: "level"
};
