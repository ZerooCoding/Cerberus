const discord = require('discord.js');

 module.exports = {
     name: 'ban',
     description: 'Permanently removes a user from server',
     execute(client, message, args){
         
        if (!message.member.hasPermission("BAN_MEMBERS")){
             
            let ErrorEmbed = new discord.MessageEmbed()
             
            .setAuthor('ERROR')
             
            .setDescription('You are unauthorized to run this command.')
             
            .setColor('#FF0000')
             
            return message.channel.send(ErrorEmbed);
         }
         
         let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
         
         const defaultBanTime = 7; //DELETE MESSAGES DAYS (7 MAX)
         
         if(!kUser){
             
            let ErrorEmbed = new Discord.MessageEmbed()
             
            .setAuthor("ERROR")
             
            .setTitle("You need to mention a user to ban!")
             
            .setColor("#FF0000")
             
            return message.channel.send(ErrorEmbed);
         
        };
        
        const index = args.shift();
        
        const kReason = args.join(' ');
        
        if(message.member.roles.highest.position <= kUser.roles.highest.position){
            
            let ErrorEmbed = new discord.MessageEmbed()
            
            .setAuthor('ERROR')
            
            .setDescription('You cannot ban a user with either a higher, or equal role than your own.')
            
            .setColor('#FF0000')
            
            return message.channel.send(ErrorEmbed);
        };
        if (kUser.id === client.user.id){
            
            let ErrorEmbed = new discord.MessageEmbed
            
            .setAuthor('ERROR')
            
            .setDescription('I cannot ban myself!')
            
            .setColor('#FF0000')
            
            return message.channel.send(ErrorEmbed);
        }
        
        if(kUser.id === message.guild.ownerID){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            
            .setDescription('You cannot ban the owner!')

            .setColor('#FF0000')
            
            return message.channel.send(ErrorEmbed)
        }
        if(message.guild.members.cache.get(client.user.id).roles.highest.position <= kUser.roles.highest.position){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('I cannot perform this task due to role hierarchy. Please fix this issue.')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed);
        }
        if(!message.guild.members.cache.get(client.user.id).hasPermission('BAN_MEMBERS')){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('I do not have the permission to run this command!')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed);
        }
        kUser.ban({ days: defaultBanTime, reason: `RESPONSIBLE MODERATOR: ${message.member.user.tag} REASON PROVIDED: ${kReason}`});
        message.channel.send(`**${kUser.user.tag}** was successfully **permanently** removed.`)
     },
 };