const Discord = require("discord.js");
let User = require("../models/user.model");

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
      users.slice(0, 3).reverse();

      const firstUserName = users[0]
        ? users[0].username
        : "Utilisateur non existant";
      const firstUserLevel = users[0] ? users[0].level : 0;
      const firstUserMessages = users[0] ? users[0].messages : 0;
      const secondUserName = users[1]
        ? users[1].username
        : "Utilisateur non existant";
      const secondUserLevel = users[1] ? users[1].level : 0;
      const secondUserMessages = users[1] ? users[1].messages : 0;
      const thirdUserName = users[2]
        ? users[2].username
        : "Utilisateur non existant";
      const thirdUserLevel = users[2] ? users[2].level : 0;
      const thirdUserMessages = users[2] ? users[2].messages : 0;

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
};

module.exports.config = {
  command: "classement"
};
