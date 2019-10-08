// Load user model
const Schedule = require("../models/schedule.model");

module.exports.run = async (bot, message, args) => {
  // Exit if the command doesn't contain argument(s) > '!setschedule args'
  if (args.length === 0) {
    return message.channel.send(
      "Pour modifier l'horaire, il suffit d'effectuer la commande `!setschedule <jour> <H + heure> <cours>`.\n• Le `<jour>` représente le jour de la semaine (hors week-end);\n• L'`<H + heure>` représente votre heure de cours;\n• Le `<cours>` représente le cours: *Math*, *Français*, *Informatique*, *Histoire*...\n• Exemple: `!setschedule Lundi H1 Français`."
    );
  }
  // Check if the command is called correctly
  if (args.length < 3) {
    return message.channel.send(
      "La commande `!sethomework` n'a pas été effectuée correctement.\nExemple: `!setschedule Lundi H1 Français`."
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
  const hour = args[1].charAt(0).toUpperCase() + args[1].slice(1);
  const hourNames = ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8"];
  const subject = args[2].charAt(0).toUpperCase() + args[2].slice(1);

  if (!dayNames.includes(day)) {
    return message.channel.send(
      "Le `<jour>` représente le jour de la semaine (hors week-end).\nExemple: `!setschedule Lundi H1 Français`."
    );
  }

  if (!hourNames.includes(hour)) {
    return message.channel.send(
      "L'`<H + heure>` représente votre heure de cours.\nExemple: `!setschedule Lundi H1 Français`."
    );
  }

  const setHour = (schedule, h, subj) => {
    switch (h) {
      case "H1":
        schedule.hour1 = subj;
        break;
      case "H2":
        schedule.hour2 = subj;
        break;
      case "H3":
        schedule.hour3 = subj;
        break;
      case "H4":
        schedule.hour4 = subj;
        break;
      case "H5":
        schedule.hour5 = subj;
        break;
      case "H6":
        schedule.hour6 = subj;
        break;
      case "H7":
        schedule.hour7 = subj;
        break;
      case "H8":
        schedule.hour8 = subj;
        break;
    }

    return schedule;
  };

  Schedule.findOne({ grade: grade, day: day })
    .then(schedule => {
      // Update schedule if existing
      if (schedule) {
        schedule = setHour(schedule, hour, subject);

        schedule.save().catch(error => console.log(`Error: ${error}`.red));
      }
      // Create schedule if not existing
      else {
        let newSchedule = new Schedule({ grade: grade, day: day });
        newSchedule = setHour(newSchedule, hour, subject);

        newSchedule.save().catch(error => console.log(`Error: ${error}`.red));
      }
    })
    .catch(error => console.log(`Error: ${error}`.red));

  // Delete the command message
  message.delete();
};

module.exports.config = {
  command: "setschedule"
};
