const discord = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Removes a user from the server',
    execute(client, message, args){
        if (!message.member.hasPermission("KICK_MEMBERS")){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('You are unauthorized to run this command.')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed);
        }
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if(!kUser){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor("ERROR")
            .setTitle("You need to mention a user to kick!")
            .setColor("#FF0000")
            return message.channel.send(ErrorEmbed);
        }
        const index = args.shift();
        const kReason = args.join(' ');
        if(member.roles.highest.position <= kUser.roles.highest.position){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('You cannot kick a user with either a higher, or equal role than your own.')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed);
        }
        if(kUser.id === client.user.id){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('I cannot kick myself!')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed)
        }
        if(kUser.id === message.guild.ownerID){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('You cannot kick the owner!')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed);
        }
        if(message.guild.members.cache.get(client.user.id).roles.highest.position <= kUser.roles.highest.position){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('I cannot perform this action due to role hierarchy. Please fix this issue.')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed);
        }
        if(!message.guild.members.cache.get(client.user.id).hasPermission('KICK_MEMBERS')){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('I do not have the permission to run this command!')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed);
        }
        message.guild.member(kUser).kick(`RESPONSIBLE MODERATOR: ${message.member.user.tag} REASON PROVIDED: ${kReason}`);
        message.channel.send(`**${kUser.user.tag}** was successfully removed from the server.`)
    },
};