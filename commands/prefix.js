const discord = require('discord.js');

module.exports = {
    name: 'prefix',
    execute(client, message, args){
        let prefix = args.join(" ")
        if(!prefix){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('You need to specify a prefix!')
            .setColor('#ff0000')
            return message.channel.send(ErrorEmbed);
        }
    }
}
