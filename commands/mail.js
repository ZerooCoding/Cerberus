const discord = require('discord.js');

module.exports = {
    name: 'mail',
    execute(client, message, args){
        const mMessage = args.join(" ")
        const user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
        if(!user){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('You need a user to mail!')
            return message.channel.send(ErrorEmbed)
        };
        if(!mMessage){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('You need a message to mail!')
        };

        let MailEmbed = new discord.MessageEmbed()
        .setAuthor('You\'ve got mail!')
        .setDescription(mMessage)
        user.send(MailEmbed);

        let InfoEmbed = new discord.MessageEmbed()
        .setAuthor('Sent!')
        .setDescription('Message has been sent successfully!')
        return message.channel.send(InfoEmbed)
    },
};