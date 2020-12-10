const discord = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Invite link for bot',
    execute(client, message, args){
        let InviteEmbed = new discord.MessageEmbed()
        .setAuthor('Invite Link')
        .addField('Invite the bot to your server!', '[Invite](https://discord.com/api/oauth2/authorize?client_id=759218208535609395&permissions=8&scope=bot)', true)
        .addField('Main Discord!', '[Support Server](https://discord.gg/UMADUKg)', true)
        return message.channel.send(InviteEmbed);
    },
};
