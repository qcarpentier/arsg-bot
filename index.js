const Discord = require('discord.js');
const fs = require('fs');
// Used for provisioning the environment
require('dotenv').config();
require('colors');

const bot = new Discord.Client();
// Collection of all the commands
bot.commands = new Discord.Collection();

// Bot Settings
const prefix = '!';
const token = process.env.TOKEN;

// Read the commands folder
fs.readdir('./commands/', (error, files) => {
  if (error) return console.log(`Error: ${error}`.red);

  // Get all .js files
  const jsFile = files.filter(file => file.split('.').pop() === 'js');
  if (jsFile.length <= 0) return console.log('Couldn\'t find commands.');

  // Loop through each file
  jsFile.forEach(file => {
    // Require all .js files
    const commands = require(`./commands/${file}`);
    console.log(`${file} loaded!`.green);

    // Set the command name (through config module) and load the modules in the command file
    bot.commands.set(commands.config.command, commands);
  });
});

// Runs whenever the bot is connected
bot.on('ready', () => {
  bot.user.setActivity('Red Dead Redemption 2', { type: 'PLAYING' });

  // Get online users (except bot)
  const onlineUsers = bot.users.filter(u => u.presence.status !== 'offline' && !u.bot).size;
  console.log('Bot started.'.cyan);
  console.log(`${onlineUsers} users are connected to the server.`.yellow);

  // Fetch 'read-me' channel to 'cache' all messages
  // 'messageReactionAdd' and 'messageReactionRemove' events will be triggered only if all messages are 'cached'
  bot.channels.find(channel => channel.name === 'read-me').fetchMessages();
});

// Runs whenever a new user is added to the server
bot.on('guildMemberAdd', member => {
  // Assign automatically the 'Guest' role.
  member.addRole(member.guild.roles.find(role => role.name === 'Guest'));
});

bot.on('messageReactionAdd', (reaction, user) => {
  // Get message linked to the reaction
  const message = reaction.message;
  // Apply the reaction event only on the 'read-me' channel and only if the emoji is ✅
  if (message.channel.name !== 'read-me') return;
  if (reaction.emoji.name !== '✅') return;

  // Fetch 'Member' and 'Guest' roles
  const memberRole = message.guild.roles.find(role => role.name === 'Member');
  const guestRole = message.guild.roles.find(role => role.name === 'Guest');
  // Trick to swap User type into a GuildMember type (to be able to assign a role)
  const member = message.guild.members.get(user.id);

  // Assign the 'Member' role and unassign the 'Guest' role
  if (!member.roles.has(memberRole.id)) {
    member.addRole(memberRole.id);
    member.removeRole(guestRole.id);
  }
});

// Basically the same as 'messageReactionAdd'
// TODO: rework
bot.on('messageReactionRemove', (reaction, user) => {
  const message = reaction.message;
  if (message.channel.name !== 'read-me') return;
  if (reaction.emoji.name !== '✅') return;

  const memberRole = message.guild.roles.find(role => role.name === 'Member');
  const guestRole = message.guild.roles.find(role => role.name === 'Guest');
  const member = message.guild.members.get(user.id);

  if (member.roles.has(memberRole.id)) {
    member.removeRole(memberRole.id);
    member.addRole(guestRole.id);
  }
});

// Runs whenever a message is received
bot.on('message', message => {
  // Variables
  const messageContent = message.content.toLowerCase();
  const args = messageContent.split(' ');
  const commandName = args[0].slice(prefix.length);
  args.shift();

  // Delete automatic 'pinned to this channel' message
  if (message.type === 'PINS_ADD' && message.author.bot) return message.delete();

  // Exit and stop if the prefix is not there, if the author is a Bot,
  // or if the command is called in Direct Message
  if (!messageContent.startsWith(prefix)) return;
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

  // console.log(`message: ${message}`.magenta);
  // console.log(`messageContent: ${messageContent}`.magenta);
  // console.log(`args: ${args}`.magenta);
  // console.log(`commandName: ${commandName}`.magenta);
  
  // Get the command
  const command = bot.commands.get(commandName);
  if (!command) return message.channel.send('Malheureusement, je ne connais pas encore cette commande. Vous pouvez proposer votre idée dans le channel #suggestions!');
  // Run the command
  command.run(bot, message, args);

  /*
  // Google Image
  else if (message.startsWith(prefix + 'googleimg')) {
    // Check if the command contains argument(s) > '!googleimg args'
    if (message.indexOf(' ') >= 0) {
      // Split the command based on space
      const args = message.split(' ');
      // Remove '!googleimg'
      args.shift();
      // Send the Google search with all the args joined with %20 (hexcode for space) and '&tbm=isch' for Images
      channel.send('https://www.google.be/#q=' + args.join('%20') + '&tbm=isch');
    }
    else {
      channel.send('Pour faire une recherche **Google Image**, il suffit d\'écrire une recherche après la commande `/googleimg`.');
    }
  }
  // Google
  else if (message.startsWith(prefix + 'google')) {
    // Check if the command contains argument(s) > '!google args'
    if (message.indexOf(' ') >= 0) {
      // Split the command based on space
      const args = message.split(' ');
      // Remove '!google'
      args.shift();
      // Send the Google search with all the args joined with %20 (hexcode for space)
      channel.send('https://www.google.be/#q=' + args.join('%20'));
    }
    else {
      channel.send('Pour faire une recherche **Google**, il suffit d\'écrire une recherche après la commande `/google`.');
    }
  }
  // Rules
  // TODO: Rework > Add Rich Embed
  else if (message.startsWith(prefix + 'rule')) {
    // Remove prefix '!'
    const ruleCommand = message.substr(1);
    // Regex matching 4 words and one digit > 'rule1', 'rule2'...
    const simpleRuleRegex = /^\w{4}\d{1}$/;
    // Regex matching 5 words for 'rules'
    const multipleRulesRegex = /^\w{5}$/;
    // Get the last character
    const lastCharacter = ruleCommand.substr(ruleCommand.length - 1);

    // Check which rule is called (1 > 5)
    if (simpleRuleRegex.test(ruleCommand) && parseInt(lastCharacter, 10) <= 5) {
      switch (lastCharacter) {
        case '1':
          channel.send('**[1]** Écrivez dans un français correct, sans spam et sans flood.');
          break;
        case '2':
          channel.send('**[2]** Respectez les autres élèves et leurs opinions.');
          break;
        case '3':
          channel.send('**[3]** N\'envoyez pas de photo d\'un élève **sans son accord**, qu\'elle soit drôle ou non.');
          break;
        case '4':
          channel.send('**[4]** L\'envoi de tout matériel nuisible, tel que les virus, est formellement interdit.');
          break;
        case '5':
          channel.send('**[5]** Respectez la loi et la sensibilité d\'autrui (pas de piratage, de pornographie, de gore, etc.).');
          break;
        default:
          break;
      }
    }
    // Check if 'rules' is called
    else if (multipleRulesRegex.test(ruleCommand) && lastCharacter == 's') {
      channel.send('**[1]** Écrivez dans un français correct, sans spam et sans flood,\n**[2]** Respectez les autres élèves et leurs opinions,\n**[3]** N\'envoyez pas de photo d\'un élève **sans son accord**, qu\'elle soit drôle ou non,\n**[4]** L\'envoi de tout matériel nuisible, tel que les virus, est formellement interdit,\n**[5]** Respectez la loi et la sensibilité d\'autrui (pas de piratage, de pornographie, de gore, etc.).');
    }
    // Default message
    else{
      channel.send('Je ne suis qu\'un **Bot**! Je n\'ai pas encore l\'intelligence de créer mes propres règles. :pensive:');
    }
  }
  // Markdown cheatlist
  else if (message.startsWith(prefix + 'markdown')) {
    // Delete the command message
    msg.delete();

    // Build the Markdown Rich Embed
    const markdownEmbed = new Discord.RichEmbed()
      .setTitle('Donnez un peu de vie à vos conversations quotidiennes!')
      .setDescription('Le **Markdown** est un système de formatage qui vous aidera à faire ressortir vos phrases. Ajoutez juste quelques caractères autour votre texte et le tour est joué!')
      .setColor('#F8F096')
      .addField('*italique*', '`*italique*` **ou** `_italique_`')
      .addField('__*italique souligné*__', '`__*italique souligné*__`')
      .addField('**gras**', '`**gras**`')
      .addField('__**gras souligné**__', '`__**gras souligné**__`')
      .addField('***gras italique***', '`***gras italique***`')
      .addField('__***gras souligné italique***__', '`__***gras souligné italique***__`')
      .addField('__souligné__', '`__souligné__`')
      .addField('~~barré~~', '`~~barré~~`')
      .addField('`code`', '`` `code` ``')
      .addField('```bloc \nde code \nde plusieurs lignes```', '` ```bloc \nde code \nde plusieurs lignes``` `');

    // Send the Rich Embed as a private message to the user
    author.send(markdownEmbed);
  }
  // Help
  else if (message.startsWith(prefix + 'help')) {
    // Delete the command message
    msg.delete();

    // Build the Help Rich Embed
    const helpEmbed = new Discord.RichEmbed()
      .setTitle('Besoin d\'aide? Vous pouvez toujours compter sur **l\'ARSG Bot!**')
      .setDescription('Pour effectuer une **commande** sur le serveur, il vous suffit simplement de faire `!` suivi du nom de la commande:')
      .setColor('#F8F096')
      .addField('`!help`', 'Affiche **l\'aide** du serveur.')
      .addField('`!rules`', 'Affiche les **règles générales** du serveur.')
      .addField('`!sethomework <type> <date> <cours> <description>`', 'Crée et épingle **un devoir, une interro, une prépa, un examen** ainsi que sa description. (uniquement dans le channel #homework)')
      .addField('`!markdown`', 'Affiche une liste détaillée sur le **Markdown**. (PS: va voir, c\'est stylé)')
      .addField('`!google <recherche>`', 'Besoin de **rechercher** quelque chose? Ton meilleur pote Google est toujours là pour t\'épauler.')
      .addField('`!googleimg <recherche>`', 'Besoin de **visualiser** quelque chose? Google Image sera toujours là pour toi.');

    // Send the Rich Embed as a private message to the user
    author.send(helpEmbed);
  }
  // Set homework
  else if (message.startsWith(prefix + 'sethomework')) {
    // Exit if the command is not inside a #homework channel
    if (!msg.channel.name.includes('homework')) return channel.send('La commande `!sethomework` est uniquement disponible dans le channel `#homework` de votre classe.');
    // Check if the command contains argument(s) > '!sethomework args'
    if (message.indexOf(' ') >= 0) {
      // Delete the command message
      msg.delete();

      // Split the command based on space
      const args = message.split(' ');

      // Check if the command is called correctly
      if(args.length < 4) return channel.send('La commande `!sethomework` n\'a pas été effectuée correctement.');

      // Args should be <type> <date> <subject> <description>
      const type = args[1].charAt(0).toUpperCase() + args[1].slice(1);
      const date = args[2];
      const subject = args[3].charAt(0).toUpperCase() + args[3].slice(1);
      let description = args.slice(4).join(' ');
      description = description.charAt(0).toUpperCase() + description.slice(1);

      // Regex matching 'dd/mm' date format
      const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])$/;
      if(!dateRegex.test(date)) return channel.send('Date erronée: la date doit impérativement être sous la forme `dd/mm`.');

      // Current date format (footer)
      const currentDate = new Date();
      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      if(day < 10) day = '0' + day;
      if(month < 10) month = '0' + month;
      // 'dd/mm/yyyy' date format
      const currentDateFormat = day + '/' + month + '/' + year;

      // Homework date format (header)
      const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
      const homeworkDate = date.split('/');
      const homeworkDay = homeworkDate[0];
      // Get the month name
      const homeworkMonth = monthNames[homeworkDate[1] - 1];
      // Get the current year
      let homeworkYear = year;
      // Check if the given homework month is before the current month
      // If it's the case, it means the year should be incremented by 1 (end of the year case)
      if(homeworkDate[1] < currentDate.getMonth() + 1) {
        homeworkYear = year + 1;
      }

      // Build the Homework Rich Embed
      const homeworkEmbed = new Discord.RichEmbed()
        .setTitle(`${type} en ${subject} pour le ${homeworkDay} ${homeworkMonth} ${homeworkYear}`)
        .setDescription(description)
        .setColor('#F8F096')
        .setFooter(`Créé par ${msg.member.displayName} le ${currentDateFormat}`);

      // Send the Rich Embed to the channel
      channel.send(homeworkEmbed).then(m => m.pin());
    }
    else {
      // Send command usage message
      channel.send('Pour créer un **devoir**, il suffit d\'effectuer la commande `!sethomework <type> <date> <sujet> <description>`.\n• Le `<type>` peut être un *devoir*, une *interro*, une *prépa*, ...\n• La `<date>` doit **impérativement** être au format `jj/mm` (**jour**\/**mois**).\n• Le `<sujet>` doit être l\'intitulé du cours: *Math*, *Français*, *Informatique*, *Histoire*...');
}
  }
  // Unpin all messages of the channel
  else if (message.startsWith(prefix + 'unpin')) {
    // Get contributore role
    const contributorRole = msg.guild.roles.find(role => role.name === 'Contributor');

    // Verify if sender has contributor role
    if (msg.member.roles.has(contributorRole.id)) {
      // Delete the command message
      msg.delete();

      // Fetch all channel pinned messages
      channel.fetchPinnedMessages().then(pinnedMessages => {
        channel.bulkDelete(pinnedMessages)
          .catch(error => channel.send(`Error: ${error}`));
      });
    }
    else {
      channel.send('Vous n\'avez pas le droit d\'utiliser cette commande.');
    }
  }
  // Purge channel message
  else if (message.startsWith(prefix + 'purge')) {
    // Get contributore role
    const administratorRole = msg.guild.roles.find(role => role.name === 'Administrator');
    let purgeNumber = 50;

    if (message.indexOf(' ') >= 0) {
      purgeNumber = message.split(' ');
      // Remove '!unpin'
      purgeNumber.shift();

      // Check if purgeNumber is actually a number
      if (isNaN(purgeNumber)) return author.send('Le nombre de messages à purger n\'est pas correct.');
    }

    // Verify if sender has contributor role
    if (msg.member.roles.has(administratorRole.id)) {
      // Delete the command message
      msg.delete();

      // Fetch all channel messages
      channel.fetchMessages({ limit: purgeNumber }).then(messages => {
        channel.bulkDelete(messages)
          .catch(error => channel.send(`Error: ${error}`));
      });
    }
    else {
      channel.send('Vous n\'avez pas le droit d\'utiliser cette commande.');
    }
  }*/
});

// Login to the server
bot.login(token);