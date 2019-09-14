module.exports.run = async (bot, message, args) => {
  // Check if the command contains argument(s) > '!google args'
  if (args.length > 0) {
    // Send the Google search with all the args joined with %20 (hexcode for space)
    message.channel.send("https://www.google.be/#q=" + args.join("%20"));
  } else {
    message.channel.send(
      "Pour faire une recherche **Google**, il suffit d'écrire une recherche après la commande `/google`."
    );
  }

  // Delete the command message
  message.delete();
};

module.exports.config = {
  command: "google"
};
