const discord = require('discord.js');

module.exports = {
    name: 'ping',
    execute(client, message, args){
        let PingEmbed = new discord.MessageEmbed()
        .setAuthor('Pong!')
        .setDescription(`${Math.round(client.ws.ping)} ms`)
        return message.channel.send(PingEmbed)
    },
};