module.exports.run = async (bot, message, args) => {
  // Exit if the command is not inside a #homework channel
  if (!message.channel.name.includes("homework")) {
    return message.channel.send(
      "La commande `!sethomework` est uniquement disponible dans le channel `#homework` de votre classe."
    );
  }

  // Homework month
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

  const channelNames = [
    "3ttri-homework",
    "4ttri-homework",
    "5ttri-homework",
    "6ttri-homework"
  ];

  // Check for homeworks for all channels
  for (const channelName of channelNames) {
    const channel = bot.channels.find(
      chan => chan.name === channelName
    );

    channel
      .fetchMessages()
      .then(channelMessages =>
        channelMessages.forEach(msg => {
          msg.embeds.forEach(embed => {
            const today = new Date();

            // Fetch and build the homework date
            const contentSpliter = embed.description.split(" ");
            const content = {
              day: parseInt(contentSpliter[2]),
              month: parseInt(monthNames.indexOf(contentSpliter[3]) + 1),
              year: parseInt(contentSpliter[4])
            };

            const homeworkDate = new Date(
              content.year,
              content.month - 1,
              content.day + 1
            );

            console.log(homeworkDate);

            if (today >= homeworkDate) {
              msg.edit("", {
                embed: {
                  title: emb.title,
                  description: emb.description,
                  color: "3394611",
                  footer: {
                    text: emb.footer.text
                  }
                }
              })
            }
          });
        })
      )
      .catch(err => console.log(err.red));
  }

  // Delete the command message
  message.delete();
};

module.exports.config = {
  command: "checkhomework"
};
