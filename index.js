const Discord = require('discord.js');
const bot = new Discord.Client();
// Using colors in Console.Log > For tests only
const colors = require('colors');

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
	// console.log(`${user.username} unreacted with ${reaction.emoji.name}`.yellow);
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

	// Ping-Pong
	if (message.startsWith(prefix + 'ping')) {
		channel.send('pong!');
	}
	// Invite link
	if (message.startsWith(prefix + 'invitelink')) {
		channel.send('Invite link: https://discord.gg/y4vTKAR');
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
	// TODO: Rework > Add Rich Embed + specific checks to avoid troll numbers
	if (message.startsWith(prefix + 'rule')) {
		const ruleNumber = message.substr(message.length - 1);

		switch (ruleNumber) {
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
		case 's':
			channel.send('**[1]** Écrivez dans un français correct, sans spam et sans flood,\n**[2]** Respectez les autres élèves et leurs opinions,\n**[3]** N\'envoyez pas de photo d\'un élève **sans son accord**, qu\'elle soit drôle ou non,\n**[4]** L\'envoi de tout matériel nuisible, tel que les virus, est formellement interdit,\n**[5]** Respectez la loi et la sensibilité d\'autrui (pas de piratage, de pornographie, de gore, etc.).');
			break;
		default:
			channel.send('Je ne suis qu\'un **Bot**! Je n\'ai pas encore l\'intelligence de créer mes propres règles. :pensive:');
			break;
		}
	}
});

// Login  to the server
bot.login(process.env.token);