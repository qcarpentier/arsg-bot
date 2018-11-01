const Discord = require("discord.js");
const fs = require("fs");
// Used for provisioning the environment
require("dotenv").config();
require("colors");

const bot = new Discord.Client();
// Collection of all the commands
bot.commands = new Discord.Collection();

// Bot Settings
const prefix = "!";
const token = process.env.TOKEN;

// Read the commands folder
fs.readdir("./commands/", (error, files) => {
  if (error) return console.log(`Error: ${error}`.red);

  // Get all .js files
  const jsFile = files.filter(file => file.split(".").pop() === "js");
  if (jsFile.length <= 0) return console.log("Couldn't find commands.");

  // Loop through each file
  jsFile.forEach(file => {
    // Require all .js files
    const commands = require(`./commands/${file}`);
    // console.log(`${file} loaded!`.green);

    // Set the command name (through config module) and load the modules in the command file
    bot.commands.set(commands.config.command, commands);
  });
});

// Runs whenever the bot is connected
bot.on("ready", () => {
  bot.user.setActivity("Red Dead Redemption 2", { type: "PLAYING" });

  // Get online users (except bot)
  const onlineUsers = bot.users.filter(
    u => u.presence.status !== "offline" && !u.bot
  ).size;
  console.log("Bot started.".cyan);
  console.log(`${onlineUsers} users are connected to the server.`.yellow);

  // Fetch 'read-me' channel to 'cache' all messages
  // 'messageReactionAdd' and 'messageReactionRemove' events will be triggered only if all messages are 'cached'
  bot.channels.find(channel => channel.name === "read-me").fetchMessages();
});

// Runs whenever a new user is added to the server
bot.on("guildMemberAdd", member => {
  // Assign automatically the 'Guest' role.
  member.addRole(member.guild.roles.find(role => role.name === "Guest"));
});

bot.on("messageReactionAdd", (reaction, user) => {
  // Get message linked to the reaction
  const message = reaction.message;
  // Apply the reaction event only on the 'read-me' channel and only if the emoji is ✅
  if (message.channel.name !== "read-me") return;
  if (reaction.emoji.name !== "✅") return;

  // Fetch 'Member' and 'Guest' roles
  const memberRole = message.guild.roles.find(role => role.name === "Member");
  const guestRole = message.guild.roles.find(role => role.name === "Guest");
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
bot.on("messageReactionRemove", (reaction, user) => {
  const message = reaction.message;
  if (message.channel.name !== "read-me") return;
  if (reaction.emoji.name !== "✅") return;

  const memberRole = message.guild.roles.find(role => role.name === "Member");
  const guestRole = message.guild.roles.find(role => role.name === "Guest");
  const member = message.guild.members.get(user.id);

  if (member.roles.has(memberRole.id)) {
    member.removeRole(memberRole.id);
    member.addRole(guestRole.id);
  }
});

// Runs whenever a message is received
bot.on("message", message => {
  // Variables
  const messageContent = message.content.toLowerCase();
  const args = messageContent.split(" ");
  const commandName = args[0].slice(prefix.length);
  args.shift();

  // Delete automatic 'pinned to this channel' message
  if (message.type === "PINS_ADD" && message.author.bot) {
    return message.delete();
  }

  // Exit and stop if the prefix is not there, if the author is a Bot,
  // or if the command is called in Direct Message
  if (!messageContent.startsWith(prefix)) return;
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  console.log(`message: ${message}`.magenta);
  console.log(`messageContent: ${messageContent}`.magenta);
  console.log(`args: ${args}`.magenta);
  console.log(`commandName: ${commandName}`.magenta);

  // Get the command
  const command = bot.commands.get(commandName);
  if (!command) {
    return message.channel.send(
      "Malheureusement, je ne connais pas encore cette commande. Vous pouvez proposer votre idée dans le channel `#suggestions`!"
    );
  }
  // Run the command
  command.run(bot, message, args);
});

// Login to the server
bot.login(token);
