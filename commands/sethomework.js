const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  // Exit if the command is not inside a #homework channel
  if (!message.channel.name.includes("homework")) return message.channel.send("La commande `!sethomework` est uniquement disponible dans le channel `#homework` de votre classe.");
  // Exit if the command doesn't contain argument(s) > '!sethomework args'
  if (args.length === 0) return message.channel.send("Pour créer un **devoir**, il suffit d'effectuer la commande `!sethomework <type> <date> <sujet> <description>`.\n• Le `<type>` peut être un *devoir*, une *interro*, une *prépa*, ...\n• La `<date>` doit **impérativement** être au format `jj/mm` (**jour**\/**mois**).\n• Le `<sujet>` doit être l'intitulé du cours: *Math*, *Français*, *Informatique*, *Histoire*...");
  // Check if the command is called correctly
  if (args.length < 3) return message.channel.send("La commande `!sethomework` n'a pas été effectuée correctement.");

  // Args should be <type> <date> <subject> <description>
  const type = args[0].charAt(0).toUpperCase() + args[0].slice(1);
  const date = args[1];
  const subject = args[2].charAt(0).toUpperCase() + args[2].slice(1);
  let description = args.slice(3).join(" ");
  description = description.charAt(0).toUpperCase() + description.slice(1);

  // Regex matching 'dd/mm' date format
  const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])$/;
  if(!dateRegex.test(date)) return message.channel.send("Date erronée: la date doit impérativement être sous la forme `dd/mm`.");

  // Current date format (footer)
  const currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  if(day < 10) day = "0" + day;
  if(month < 10) month = "0" + month;
  // 'dd/mm/yyyy' date format
  const currentDateFormat = day + "/" + month + "/" + year;

  // Homework date format (header)
  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  const homeworkDate = date.split("/");
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
    .setColor("#F8F096")
    .setFooter(`Créé par ${message.member.displayName} le ${currentDateFormat}`);

  // Send the Rich Embed to the channel
  message.channel.send(homeworkEmbed).then(m => m.pin());

  // Delete the command message
  message.delete();
};

module.exports.config = {
  command: "sethomework",
};

