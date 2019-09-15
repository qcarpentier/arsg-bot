const Discord = require("discord.js");
const User = require("../models/user.model");

module.exports.run = async (bot, message, args) => {
  const channel = message.channel;

  // Current date format
  const currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  // 'dd/mm/yyyy' date format
  const currentDateFormat = day + "/" + month + "/" + year;

  // Get level ordered by highest > lowest
  User.find()
    .then(users => {
      const sortedUsers = users.sort((a, b) => (a.messages < b.messages) ? 1 : -1).slice(0, 3);

      const firstUserName = sortedUsers[0]
        ? sortedUsers[0].username
        : "Utilisateur non existant";
      const firstUserLevel = sortedUsers[0] ? sortedUsers[0].level : 0;
      const firstUserMessages = sortedUsers[0] ? sortedUsers[0].messages : 0;
      const secondUserName = sortedUsers[1]
        ? sortedUsers[1].username
        : "Utilisateur non existant";
      const secondUserLevel = sortedUsers[1] ? sortedUsers[1].level : 0;
      const secondUserMessages = sortedUsers[1] ? sortedUsers[1].messages : 0;
      const thirdUserName = sortedUsers[2]
        ? sortedUsers[2].username
        : "Utilisateur non existant";
      const thirdUserLevel = sortedUsers[2] ? sortedUsers[2].level : 0;
      const thirdUserMessages = sortedUsers[2] ? sortedUsers[2].messages : 0;

      const classementEmbed = new Discord.RichEmbed()
        .setTitle(`Classement du ${currentDateFormat}`)
        .setColor("RANDOM")
        .setDescription(
          `**[1]** ${firstUserName} - Level ${firstUserLevel} \n *${firstUserMessages} message(s)* \n
           **[2]** ${secondUserName} - Level ${secondUserLevel} \n *${secondUserMessages} message(s)* \n
           **[3]** ${thirdUserName} - Level ${thirdUserLevel} \n *${thirdUserMessages} message(s)*`
        )
        .setFooter(`Demandé par ${message.member.displayName}`);

      channel.send(classementEmbed);
    })
    .catch(error => console.log(`Error: ${error}`));

  // Delete the command message
  message.delete();
};

module.exports.config = {
  command: "rank"
};
