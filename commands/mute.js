const discord = require('discord.js');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    name: 'mute',
    description: "Used to Mute a Member",
    async execute(client, message, args,){
        function arrayContains(needle, arrhaystack)
        {
            return (arrhaystack.indexOf(needle) > -1);
        };
        let mutes = JSON.parse(fs.readFileSync('./mutes.json', "utf8"));
        if (!message.member.hasPermission("MANAGE_CHANNELS")){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('You are unauthorized to to run this command!')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed)
        }
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if(!kUser){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('You need to mention a user to mute!')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed)
        };
        const index = args.shift();
        let kReason = args.join(' ');
        if(message.member.roles.highest.position <= kUser.roles.highest.position){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('You cannot ban a user with either a higher, or equal role than your own.')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed)
        }
        if (kUser.id === client.user.id){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('I cannot mute myself!')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed)
        }
        if(kUser.id === message.guild.ownerID){
            ;let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('You cannot mute the owner!')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed)
        }
        if(!message.guild.members.cache.get(client.user.id).hasPermission('MANAGE_CHANNELS')){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('I do not have permissions to run this command!')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed)
        }
        message.guild.channels.cache.each((channel) => {
            channel.updateOverwrite(kUser.id, {
                SEND_MESSAGES: false,
                CONNECT: false,
                SPEAK: false,
            }); 
        });
        if (!mutes[kUser.id]) mutes[kUser.id] = {
            guilds: [

            ],
        };
        let MATCH = arrayContains(message.member.guild.id, mutes[kUser.id].guilds);
        if(MATCH) return message.channel.send(`**${kUser.user.tag}** Is Already Muted!`);
        mutes[kUser.id].guilds.unshift(message.guild.id);
        fs.writeFile('./mutes.json', JSON.stringify(mutes, null, 4), err => {
            if(err) throw err;
        });
        if(!kReason) kReason = "Unspecified";
        const embed = new discord.MessageEmbed()
        .setDescription(`${kUser.user.tag} was muted! Reason: ${kReason}`)
        const notice = new discord.MessageEmbed()
        .setColor('#F73303')
        .setAuthor(`Punishment for ${kUser.user.tag} | ${uuidv4()}`)
        .setDescription(`You have been muted!\n Responsible Moderator: ${message.member.user.tag}\n Reason: ${kReason}`);
        message.channel.send(embed);
        kUser.send(notice);
    }
}