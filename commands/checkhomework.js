module.exports.run = async (bot, message, args) => {

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

    //Homework channels
    const channelNames = [
        "3ttri-homework",
        "4ttri-homework",
        "5ttri-homework",
        "6ttri-homework"
    ]

    // for(let i in channelNames){              uncomment for use in public version
        let testChannel = bot.channels.find(channel => channel.name === "bot-homework")         //comment for use in public version
        // let testChannel = bot.channels.find(channel => channel.name === channelNames[i])         uncomment for use in public version
        let today = new Date()
        message.delete()
        testChannel.fetchMessages().then((result) => {
          result.forEach(msg => {
            msg.embeds.forEach(emb => {
                let contentSpliter = (emb.description).split(" ")
                let content = {
                  day: parseInt(contentSpliter[2]) + 1,
                  month: monthNames.indexOf(contentSpliter[3]),
                  year: parseInt(((contentSpliter[4]).split('\n'))[0])
              }
                if(today >= new Date(content.year, content.month, content.day+1)){
                  msg.delete()
                } 
            })
          });
        })    
        .catch(err => {
          console.log(err)
        })  
    // }
};
  
module.exports.config = {
    command: "checkhomework"
};  