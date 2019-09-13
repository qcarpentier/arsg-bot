const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  // Exit if the command is not inside a #event channel
  if (!message.channel.name.includes("events"))
    return message.channel.send(
      "La commande `!event` est uniquement disponible dans le channel `#events`"
    );
  // Exit if the command doesn't contain argument(s) > '!event args'
  if (args.length === 0)
    return message.channel.send(
      "Pour créer un **event**, il suffit d'effectuer la commande `!event <date> <sujet> <description>`.\n• La `<date>` doit **impérativement** être au format `jj/mm` (**jour**/**mois**).\n• Le `<sujet>` peut être le nom de l'evenement. ex: *Cinéma*, *Voyage*, *Souper*, *Congé* ... Celui-ci doit **impérativement** être en **un seul** mot."
    );
  // Check if the command is called correctly
  if (args.length < 3)
    return message.channel.send(
      "La commande `!event` n'a pas été effectuée correctement."
    );

  // Args should be <type> <date> <subject> <description>
  const date = args[0];
  const sujet = args[1].charAt(0).toUpperCase() + args[1].slice(1);
  let description = args.slice(2).join(" ");
  description = description.charAt(0).toUpperCase() + description.slice(1);

  // Regex matching 'dd/mm' date format
  const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])$/;
  if (!dateRegex.test(date))
    return message.channel.send(
      "Date erronée: la date doit impérativement être sous la forme `jj/mm`."
    );

  // Current date format (footer)
  const currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  // 'dd/mm/yyyy' date format
  const currentDateFormat = day + "/" + month + "/" + year;

  // Event date format (header)
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
  ];
  const eventDate = date.split("/");
  const eventDay = eventDate[0];
  // Get the month name
  const eventMonth = monthNames[eventDate[1] - 1];
  // Get the current year
  let eventYear = year;
  // Check if the given event month is before the current month
  // If it's the case, it means the year should be incremented by 1 (end of the year case)
  if (eventDate[1] < currentDate.getMonth() + 1) {
    eventYear = year + 1;
  }

  // Build the event Rich Embed
  const eventEmbed = new Discord.RichEmbed()
    .setTitle(`${sujet} le ${eventDay} ${eventMonth} ${eventYear}`)
    .setDescription(description)
    .setColor("#F8F096")
    .setFooter(
      `Créé par ${message.member.displayName} le ${currentDateFormat}`
    );

  // Send the Rich Embed to the channel and pin it
  message.channel.send(eventEmbed).then(m => m.pin());

  // Delete the command message
  message.delete();
};

module.exports.config = {
  command: "event"
};
