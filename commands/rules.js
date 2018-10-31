const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  // Delete the command message
  message.delete();

  // Build the Markdown Rich Embed
  const rulesEmbed = new Discord.RichEmbed()
    .setTitle('Pour que cet endroit reste cordial, vous êtes tenus de respecter quelques **règles élémentaires.**')
    .setColor('#F8F096')
    .addField('**[1]**', 'Écrivez dans un français correct, sans spam et sans flood.')
    .addField('**[2]**', 'Respectez les autres élèves et leurs opinions.')
    .addField('**[3]**', 'N\'envoyez pas de photo d\'un élève **sans son accord**, qu\'elle soit drôle ou non.')
    .addField('**[4]**', 'L\'envoi de tout matériel nuisible, tel que les virus, est formellement interdit.')
    .addField('**[5]**', 'Respectez la loi et la sensibilité d\'autrui (pas de piratage, de pornographie, de gore, etc.).');

  // Send the Rich Embed as a private message to the user
  message.channel.send(rulesEmbed);
  
  // TODO: Rework and fix issue to be able to call specific rule...

  // const messageContent = message.content.toLowerCase();
  //   // Remove prefix '!'
  //   const ruleCommand = messageContent.substr(1);
  //   // Regex matching 4 words and one digit > 'rule1', 'rule2'...
  //   const simpleRuleRegex = /^\w{4}\d{1}$/;
  //   // Regex matching 5 words for 'rules'
  //   const multipleRulesRegex = /^\w{5}$/;
  //   // Get the last character
  //   const lastCharacter = ruleCommand.substr(ruleCommand.length - 1);

  //   // Check which rule is called (1 > 5)
  //   if (simpleRuleRegex.test(ruleCommand) && parseInt(lastCharacter, 10) <= 5) {
  //     switch (lastCharacter) {
  //       case '1':
  //         channel.send('**[1]** Écrivez dans un français correct, sans spam et sans flood.');
  //         break;
  //       case '2':
  //         channel.send('**[2]** Respectez les autres élèves et leurs opinions.');
  //         break;
  //       case '3':
  //         channel.send('**[3]** N\'envoyez pas de photo d\'un élève **sans son accord**, qu\'elle soit drôle ou non.');
  //         break;
  //       case '4':
  //         channel.send('**[4]** L\'envoi de tout matériel nuisible, tel que les virus, est formellement interdit.');
  //         break;
  //       case '5':
  //         channel.send('**[5]** Respectez la loi et la sensibilité d\'autrui (pas de piratage, de pornographie, de gore, etc.).');
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  //   // Check if 'rules' is called
  //   else if (multipleRulesRegex.test(ruleCommand) && lastCharacter == 's') {
  //     channel.send('**[1]** Écrivez dans un français correct, sans spam et sans flood,\n**[2]** Respectez les autres élèves et leurs opinions,\n**[3]** N\'envoyez pas de photo d\'un élève **sans son accord**, qu\'elle soit drôle ou non,\n**[4]** L\'envoi de tout matériel nuisible, tel que les virus, est formellement interdit,\n**[5]** Respectez la loi et la sensibilité d\'autrui (pas de piratage, de pornographie, de gore, etc.).');
  //   }
  //   // Default message
  //   else {
  //     channel.send('Je ne suis qu\'un **Bot**! Je n\'ai pas encore l\'intelligence de créer mes propres règles. :pensive:');
  //   }
};

module.exports.config = {
  command: 'rules',
};
