module.exports.run = async (bot, message, args) => {

  const channel = message.channel;
  const author = message.member;
  const author_alias = message.member.user.username;

  let level;

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

  // Get info about user
  connection.query(`SELECT * FROM users WHERE username = '${author.toString()}'`, (err, rows, fields) => {
    
    if (err) throw err;

    if(rows[0]) {
      channel.send(`${author} est level ${rows[0].level} !`);
    } else {
      
      // Create new user if doesn't exist
      connection.query(`INSERT INTO users (username, alias) VALUES ('${author.toString()}', '${author_alias}')`, (err, result) => {

        if (err) throw err;

        channel.send(`${author} est level 1`);

      });

    }

  });

};

module.exports.config = {
  command: "level"
};