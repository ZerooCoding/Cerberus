const discord = require('discord.js');

module.exports = {
    name: 'purge',
    execute(client, message, args){
        if(!message.member.hasPermission("MANAGE_MESSAGES")){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('You are unauthorized to run this command!')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed);
        }
        if(isNaN(args[0])){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('You need a numerical value!')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed);
        }
        if(args[0] > 100){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('I currently cannot purge more than 100 messages.')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed);
        }
        if(!message.guild.members.cache.get(client.user.id).hasPermission('MANAGE_MESSAGES')){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('I do not have the permission to run this command!')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed);
        }
        message.delete();
        message.channel.bulkDelete(args[0])
        .then(messages => message.channel.send(`Successfully deleted \`${messages.size}/${args[0]}\` messages.`)).then( msg => msg.delete({ timeout: 2000 }))
        .catch( error => message.channel.send(`**ERROR**: ${error}`))
    }
}