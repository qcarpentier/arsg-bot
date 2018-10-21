const Discord = require('discord.js');
const colors = require('colors');

const bot = new Discord.Client();

// Bot Settings
const prefix = '!';

// Runs whenever the bot is connected
bot.on('ready', () => {
	console.log('Bot started.'.cyan);
	bot.user.setActivity('Fortnite 2', { type: 'PLAYING' });

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
	// console.log(`${user.username} reacted with ${reaction.emoji.name}`.yellow);

	// Variables
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
	console.log(`${user.username} unreacted with ${reaction.emoji.name}`.yellow);
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
bot.on('message', msg => {
	// Variables
	const message = msg.content.toLowerCase();
	const channel = msg.channel;
	const author = msg.author;

	// Exit and stop if the prefix is not there
	if (!message.startsWith(prefix)) return;

	// Ping-Pong
	if (message.startsWith(prefix + 'ping')) {
		channel.send('pong!');
	}
	// Invite link
	else if (message.startsWith(prefix + 'invitelink')) {
		channel.send('Lien d\'invitation: https://discord.gg/y4vTKAR');
	}
	// Google Image
	else if (message.startsWith(prefix + 'googleimg')) {
		// Check if the command contains argument(s) > '/google args'
		if (message.indexOf(' ') >= 0) {
			// Split the command based on space
			const args = message.split(' ');
			// Remove '/google'
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
		// Check if the command contains argument(s) > '/google args'
		if (message.indexOf(' ') >= 0) {
			// Split the command based on space
			const args = message.split(' ');
			// Remove '/google'
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
	if (message.startsWith(prefix + 'rule')) {
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
		// Delete the command message
		msg.delete();
	}
	// Help
	else if (message.startsWith(prefix + 'help')) {
		// Build the Help Rich Embed
		const helpEmbed = new Discord.RichEmbed()
			.setTitle('Besoin d\'aide? Vous pouvez toujours compter sur **l\'ARSG Bot!**')
			.setDescription('Pour effectuer une **commande** sur le serveur, il vous suffit simplement de faire `!` suivi du nom de la commande:')
			.setColor('#F8F096')
			.addField('`!help`', 'Affiche **l\'aide** du serveur.')
			.addField('`!rules`', 'Affiche les **règles générales** du serveur.')
			.addField('`!markdown`', 'Affiche une liste détaillée sur le **Markdown**. (PS: va voir, c\'est stylé)')
			.addField('`!google <recherche>`', 'Besoin de **rechercher** quelque chose? Ton meilleur pote Google est toujours là pour t\'épauler.')
			.addField('`!googleimg <recherche>`', 'Besoin de **visualiser** quelque chose? Google Image sera toujours là pour toi.');

		// Send the Rich Embed as a private message to the user
		author.send(helpEmbed);
		// Delete the command message
		msg.delete();
	}
});

// Login to the server
bot.login(process.env.token);