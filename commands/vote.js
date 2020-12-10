const discord = require('discord.js');

module.exports = {
    name: 'vote',
    execute(client, message, args){
        let VoteEmbed = new discord.MessageEmbed()
        .setAuthor('Vote!')
        .addField('Vote Link for Cerberus')
    }
}