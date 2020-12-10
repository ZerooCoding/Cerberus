const discord = require('discord.js');
const fs = require("fs");
module.exports = {
    name: 'unmute',
    async execute(client, message, args,){
        function arrayContains(needle, arrhaystack)
        {
            return (arrhaystack.indexOf(needle) > -1);
        };
        let mutes = JSON.parse(fs.readFileSync('./mutes.json', "utf8"));
        if (!message.member.hasPermission("MANAGE_CHANNELS")){
            let ErrorEmbed = new discord.MessageEmbed
            .setAuthor('ERROR')
            .setDescription('You are unauthorized to run this command!')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed)
        }
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if(!kUser){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('You must mention a user to unmute!')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed);
        };
        const index = args.shift();
        let kReason = args.join(' ');
        if(message.member.roles.highest.position <= kUser.roles.highest.position){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('You cannot unmute a user with either a higher, or equal role than your own.')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed)
        }
        if (kUser.id === client.user.id){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('I cannot unmute myself!')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed)
        }
        if(kUser.id === message.guild.ownerID){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('You cannot unmute the owner!')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed)
        }
        if(!message.guild.members.cache.get(client.user.id).hasPermission('MANAGE_CHANNELS')){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('I do not have the permission to run this command!')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed);
        }
        if (!mutes[kUser.id]){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription(`${kUser.user.tag} is not muted!`)
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed)
        }
        let MATCH = arrayContains(message.guild.id, mutes[kUser.id].guilds)
        if(MATCH) mutes[kUser.id].guilds.splice(mutes[kUser.id].guilds.indexOf(message.guild.id), 1);
        if(!MATCH){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription(`${kUser.user.tag} is not muted!`)
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed)
        }
        fs.writeFile('./mutes.json', JSON.stringify(mutes), err => {
            if(err) throw err;
        });
        message.guild.channels.cache.each((channel) => {
            channel.permissionOverwrites.get(kUser.id).delete();
        });
        const InfoEmbed = new discord.MessageEmbed()
        .setAuthor('Unmuted!')
        .setDescription(`${kUser} was unmuted successfully!`)
        .addField('Info', `Reason: ${kReason}`)
        message.channel.send(InfoEmbed);
    },
};