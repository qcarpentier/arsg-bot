const Discord = require("discord.js");
const fs = require("fs");
const mongoose = require("mongoose");
// Used for provisioning the environment
require("dotenv").config();
require("colors");

// Load user model
const User = require("./models/user.model");
const levelXp = [0, 1000, 3000, 6000, 10000, 15000, 21000, 28000, 36000, 45000];

const bot = new Discord.Client();
// Collection of all the commands
bot.commands = new Discord.Collection();

// Bot Settings
const prefix = "!";
const token = process.env.TOKEN;

// MongoDB Atlas URI
const uri = process.env.ATLAS_URI;

// Read the commands folder
fs.readdir("./commands/", (error, files) => {
  if (error) return console.log(`Error: ${error}`.red);

  // Get all .js command files
  const jsFile = files.filter(file => file.split(".").pop() === "js");
  if (jsFile.length <= 0) return console.log("Couldn't find commands.");

  // Loop through each file
  jsFile.forEach(file => {
    // Require all .js files
    const commands = require(`./commands/${file}`);

    // Set the command name (through config module) and load the modules in the command file
    bot.commands.set(commands.config.command, commands);
  });
});

// Runs whenever the bot is connected
bot.on("ready", () => {
  console.log("Bot started.".cyan);

  bot.user.setActivity("Minecraft Education", { type: "PLAYING" });

  // Connect to the MongoDB database
  mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  });
  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connection established successfully!".cyan);
  });

  // Get online users (except bot)
  const onlineUsers = bot.users.filter(
    u => u.presence.status !== "offline" && !u.bot
  ).size;
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

// Runs whenever a reaction is added
bot.on("messageReactionAdd", (reaction, user) => {
  // Get message linked to the reaction
  const message = reaction.message;
  // Apply the reaction event only on the 'read-me' channel and only if the emoji is ✅
  if (message.channel.name !== "read-me" || reaction.emoji.name !== "✅") {
    return;
  }

  // Fetch 'Member', 'Guest' and 'OnHold' roles
  const onHoldRole = message.guild.roles.find(role => role.name === "OnHold");
  const memberRole = message.guild.roles.find(role => role.name === "Member");
  const guestRole = message.guild.roles.find(role => role.name === "Guest");
  // Trick to swap User type into a GuildMember type (to be able to assign a role)
  const member = message.guild.members.get(user.id);

  // Assign the 'Member' & 'OnHold' roles and unassign the 'Guest' role
  if (!member.roles.has(memberRole.id) && !member.roles.has(onHoldRole.id)) {
    member.addRole(memberRole.id);
    member.addRole(onHoldRole.id);
    member.removeRole(guestRole.id);
  }
});

// Runs whenever a reaction is removed
bot.on("messageReactionRemove", (reaction, user) => {
  const message = reaction.message;
  if (message.channel.name !== "read-me" || reaction.emoji.name !== "✅") {
    return;
  }

  const onHoldRole = message.guild.roles.find(role => role.name === "OnHold");
  const memberRole = message.guild.roles.find(role => role.name === "Member");
  const guestRole = message.guild.roles.find(role => role.name === "Guest");
  const member = message.guild.members.get(user.id);

  if (member.roles.has(memberRole.id) && member.roles.has(onHoldRole.id)) {
    member.removeRole(memberRole.id);
    if (member.roles.has(onHoldRole.id)) member.removeRole(onHoldRole.id);
    member.addRole(guestRole.id);
  }
});

// Runs whenever a message is received
bot.on("message", message => {
  if (!message.member) return;
  
  const member = message.member.displayName;

  // Remove the prefix to get the command name
  const messageContent = message.content.toLowerCase();
  const args = messageContent.split(" ");
  const commandName = args[0].slice(prefix.length);
  args.shift();

  // Delete automatic 'pinned to this channel' message
  if (message.type === "PINS_ADD" && message.author.bot) {
    return message.delete();
  }

  // Exit and stop if the author is a Bot or if the command is called in Direct Message
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  // *------------*
  // | XP feature |
  // *------------*
  // Update or create the user in MongoDB
  User.findOne({ username: member })
    .then(user => {
      // Update user if existing
      if (user) {
        user.messages++;

        const totalXp = user.messages * 10;
        let userLevel;

        levelXp.forEach((level, i) => {
          if (totalXp >= level) {
            userLevel = i + 1;
          }
        });

        user.level = userLevel;
        user
          .save()
          .catch(error => console.log(`Error: ${error}`.red));
      }
      // Create user if not existing
      else {
        const username = member;
        const messages = 1;
        const level = 1;

        const newUser = new User({ username, messages, level });

        newUser
          .save()
          .catch(error => console.log(`Error: ${error}`.red));
      }
    })
    .catch(error => console.log(`Error: ${error}`.red));

  // *-----------------*
  // | Command feature |
  // *-----------------*
  // Exit and stop if the prefix is not there
  if (!messageContent.startsWith(prefix)) return;

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
