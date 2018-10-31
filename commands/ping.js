module.exports.run = async (bot, message, args) => {
  message.channel.send('pong!');
};

module.exports.config = {
  command: 'ping',
};