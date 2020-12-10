const discord = require('discord.js');

module.exports = {
    name: 'report',
    aliases: ['botreport'],
    execute(client, message, args){
        var Dev = client.users.cache.get("566819040161562655");
        let kMessage = args.join(" ")
        if (!kMessage){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('You need a message to report!')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed);
        }
        let ReportEmbed = new discord.MessageEmbed()
        .setAuthor('REPORT')
        .setDescription(kMessage)
        Dev.send(ReportEmbed);

        let NoticeEmbed = new discord.MessageEmbed()
        .setAuthor('SENT')
        .setDescription('Report Sent!')
        return message.channel.send(NoticeEmbed);
    },
};