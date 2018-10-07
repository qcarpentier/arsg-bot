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

	// Fetch 'Member' role
	const memberRole = message.guild.roles.find(role => role.name === 'Member');
	// Trick to swap User type into a GuildMember type (to be able to assign a role)
	const member = message.guild.members.get(user.id);

	// Assign the 'Member' role
	if (!member.roles.has(memberRole.id)) {
		member.addRole(memberRole.id);
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
	const member = message.guild.members.get(user.id);

	if (member.roles.has(memberRole.id)) {
		member.removeRole(memberRole.id);
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
});

// Login  to the server
bot.login(process.env.token);