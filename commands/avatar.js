const discord = require('discord.js')

module.exports = {
    name: 'avatar',
    execute(client, message, args){
        
        let member = message.guild.member(message.mentions.users.first()) || message.member;
        
        const user = message.mentions.users.first() || message.author
        
        const Avatar = user.displayAvatarURL({ dynamic: true, size: 1024 })


        
        let AvatarEmbed = new discord.MessageEmbed()
        
        .setImage(Avatar)
        
        .setFooter(`Requested by ${member.user.tag}`)
        
        return message.channel.send(AvatarEmbed);
    },
};