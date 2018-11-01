module.exports.run = async (bot, message, args) => {
  // Check if the command contains argument(s) > '!googleimg args'
  if (message.indexOf(" ") >= 0) {
    // Send the Google search with all the args joined with %20 (hexcode for space) and '&tbm=isch' for Images
    message.channel.send(
      "https://www.google.be/#q=" + args.join("%20") + "&tbm=isch"
    );
  } else {
    message.channel.send(
      "Pour faire une recherche **Google Image**, il suffit d'écrire une recherche après la commande `/googleimg`."
    );
  }
};

module.exports.config = {
  command: "googleimg"
};
