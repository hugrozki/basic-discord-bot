const Discord = require('discord.js');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const interactions = require('./interactions');
const commands = require('./commands');
const constants = require('./constants');

const client = new Discord.Client();
client.login(process.env.DISCORD_TOKEN);

const { GENERAL_CHANNEL_NAME, HELLO_MESSAGE } = constants;
let generalChannel;

const getGeneralChanel = function(channelsCollection) {
  return channelsCollection.find(channel => channel.name === GENERAL_CHANNEL_NAME);
}

client.on('ready', () => {
  generalChannel = getGeneralChanel(client.channels.cache);
  console.log(`Login in as: ${client.user.tag}`)
});

client.on('message', message => {
  const content = message.content.toLowerCase();
  const username = message.author.username;

  if (content[0] === '!') {
    const [tag, ...params ] = content.split(' ');
    const reply = commands.getReply(tag, params, username);
    message.reply(reply);
  }
  else {
    const reply = interactions.getReply(message);
    if(reply) message.reply(reply);
  }
})

client.on('guildMemberAdd', member => {
  if (typeof generalChannel !== 'undefined') {
    const message = `Hi ${member}. ${HELLO_MESSAGE}`;
    client.channels.cache.get(generalChannel.id).send(message);
  }
});