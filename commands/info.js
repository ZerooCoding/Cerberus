const discord = require('discord.js');
const moment = require('moment');
const ms = require('ms')
const Prefix = '^^^';

module.exports = {
    name: 'info',
    execute(client, message, args){
        const Avatar = ('https://i.postimg.cc/D0Vgvn1F/9bf8f2b2a3ef29d3e79e26114161b0d7.png')
        let botembed = new discord.MessageEmbed()
        .setTitle("Bot Info")
        .setThumbnail(Avatar)
        .setDescription(`Cerberus Official Bot`)
        .setFooter(`Do you want to invite the bot to your server? do \"${Prefix}invite\"`)
        .addField(`- Bot creators: \n`, `> TwilightInAutumn#2758`, true)
        .addField(`- Bot info: \n`, `> ${client.user.tag}\n`)
        .addField(`- Users \n`, `> ${client.users.cache.size} Users\n`, true)
        .addField(`- Guilds \n`, `> ${client.guilds.cache.size} Guilds\n`, true)
        .addField(`- Created on: `, `> ${moment.utc(client.user.createdAt).format("dddd, MMMM Do YYYY")} (${ms(Date.now()- client.user.createdAt, {long: true})})`, true)
        .addField('`\nBot Version: BETA v1.0.1\nChange Log\n > Added Report Command`\n\n', 'Check back next time for more updates!', false)
        return message.channel.send(botembed)
    }
}
