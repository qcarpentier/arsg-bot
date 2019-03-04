const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

  const channel = message.channel;

  // Current date format
  const currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  if(day < 10) day = "0" + day;
  if(month < 10) month = "0" + month;
  // 'dd/mm/yyyy' date format
  const currentDateFormat = day + "/" + month + "/" + year;

  // Current time format
  const currentTime = new Date();
  let hour = currentDate.getHours();
  let minute = currentDate.getMinutes();
  if(hour < 10) hour = "0" + hour;
  if(minute < 10) minute = "0" + minute;
  // 'hh/mm' date format
  const currentTimeFormat = hour + ":" + minute;

  const mysql = require('mysql');

  const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
  });

  // Connect to DB
  connection.connect((err) => {
    if(err) {
      console.log('DB Error'.red);
    }
  });

  // Get level ordered by highest > lowest
  connection.query(`SELECT * FROM users ORDER BY level DESC`, (err, rows, fields) => {
    
    if (err) throw err;

    // Build the classement Rich Embed
    const classementEmbed = new Discord.RichEmbed()
    .setTitle(`Classement du ${currentDateFormat} à ${currentTimeFormat}`)
    .setColor("#79B1F2")
    .setDescription(
      `**[1]** ${rows[0].alias} level ${rows[0].level} \n *${rows[0].message} message(s)* \n
       **[2]** ${rows[1].alias} level ${rows[1].level} \n *${rows[1].message} message(s)* \n
       **[3]** ${rows[2].alias} level ${rows[2].level} \n *${rows[2].message} message(s)*`
    )
    .setFooter(`Demandé par ${message.member.displayName}`);

    channel.send(classementEmbed);

  });

};

module.exports.config = {
  command: "classement"
};