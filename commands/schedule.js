const Discord = require("discord.js");

// Load user model
const Schedule = require("../models/schedule.model");

module.exports.run = async (bot, message, args) => {
  // Exit if the command doesn't contain argument(s) > '!setschedule args'
  if (args.length === 0) {
    return message.channel.send(
      "Pour afficher l'horaire, il suffit d'effectuer la commande `!schedule <jour>`.\nLe `<jour>` représente le jour de la semaine (hors week-end)\nExemple: `!schedule Lundi`."
    );
  }

  //  Fetch student roles
  const grade3DTTrI = message.guild.roles.find(role => role.name === "3D");
  const grade3ETTrI = message.guild.roles.find(role => role.name === "3E");
  const grade4TTrI = message.guild.roles.find(role => role.name === "4TTrI");
  const grade5TTrI = message.guild.roles.find(role => role.name === "5TTrI");
  const grade6TTrI = message.guild.roles.find(role => role.name === "6TTrI");

  // Get student grades (based on their roles)
  let grade;

  if (message.member.roles.has(grade3DTTrI.id)) {
    grade = "3D";
  } else if (message.member.roles.has(grade3ETTrI.id)) {
    grade = "3E";
  } else if (message.member.roles.has(grade4TTrI.id)) {
    grade = "4TTrI";
  } else if (message.member.roles.has(grade5TTrI.id)) {
    grade = "5TTrI";
  } else if (message.member.roles.has(grade6TTrI.id)) {
    grade = "6TTrI";
  } else {
    return message.channel.send(
      "Vous devez faire partie d'une classe TTrI pour effectuer cette commande!"
    );
  }

  const day = args[0].charAt(0).toUpperCase() + args[0].slice(1);
  const dayNames = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

  if (!dayNames.includes(day)) {
    return message.channel.send(
      "Le `<jour>` doit représenter le jour de la semaine (hors week-end).\nExemple: `!schedule Lundi`."
    );
  }

  Schedule.findOne({ grade: grade, day: day })
    .then(schedule => {
      if (!schedule) {
        return message.channel.send(
          `L'horaire du ${day} n'a pas encore été créé pour votre classe. (${grade})`
        );
      }

      return message.channel.send(
        `>>> **${grade} - ${day}**\n` +
          `1ère H - ${schedule.hour1 ? schedule.hour1 : "*"}\n` +
          `2ème H - ${schedule.hour2 ? schedule.hour2 : "*"}\n` +
          `3ème H - ${schedule.hour3 ? schedule.hour3 : "*"}\n` +
          "Récréation\n" +
          `4ème H - ${schedule.hour4 ? schedule.hour4 : "*"}\n` +
          `5ème H - ${schedule.hour5 ? schedule.hour5 : "*"}\n` +
          "Pause Midi\n" +
          `6ème H - ${schedule.hour6 ? schedule.hour6 : "*"}\n` +
          `7ème H - ${schedule.hour7 ? schedule.hour7 : "*"}\n` +
          `8ème H - ${schedule.hour8 ? schedule.hour8 : "*"}`
      );
    })
    .catch(error => console.log(`Error: ${error}`.red));

  // Delete the command message
  message.delete();
};

module.exports.config = {
  command: "schedule"
};
