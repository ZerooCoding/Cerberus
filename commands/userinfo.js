const Discord = require("discord.js");
const moment = require("moment");
const ms = require("ms");

module.exports = {
    name: 'userinfo',
    execute(client, message, args){
        const status = {
            online: "Online",
            idle: "Idle",
            dnd: "Do not Disturb",
            offline: "Offline"
        }

        let member = message.guild.member(message.mentions.users.first()) || message.member;
        const user = message.mentions.users.first() || message.author
        const Avatar = user.displayAvatarURL({ dynamic: true })
        
        var game = "Not active";
  
        if(!member.presence.game ){
            game = "No game is played."
        }else {
            game = member.presence.game.name
        }
        const uinfoembed = new Discord.MessageEmbed()
        .setTitle(`User info from ${member.user.username}`)
        .setFooter(`At: ${moment().format("dddd, MMMM Do YYYY, h:mm A", Date.now())}`)
        .setThumbnail(Avatar)
        .addField(`User information:`, `**Username** ${member.user.username}\n\n**ID** ${member.user.id}\n\n**Tag** ${member.user.tag}`, true)
        .addField(`Created at:`, `${moment(member.user.createdAt).format("dddd, MMMM Do YYYY, h:mm A", Date.now())}`, true)
        .addField(`Joined at:`, `${moment(member.user.joinedAt).format("dddd, MMMM Do YYYY, h:mm A" , Date.now())}`, true)
        .addField(`Status:`, `**Status** ${status[member.user.presence.status]}`, true)
        return message.channel.send(uinfoembed);
    },
};