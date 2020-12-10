const discord = require('discord.js');

module.exports = {
    name: 'say',
    execute(client, message, args){
        let member = message.guild.member(message.mentions.users.first()) || message.member;
        const user = message.mentions.users.first() || message.author
        
        const kMessage = args.join(" ")
        if(!kMessage){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('You must write something to say!')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed);
        };
        let MessageEmbed = new discord.MessageEmbed()
        .setAuthor(`${member.user.tag} says:`)
        .setDescription(kMessage)
        return message.channel.send(MessageEmbed);
    },
};