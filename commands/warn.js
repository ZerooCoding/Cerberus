const discord = require('discord.js')
const fs = require('fs')
const ms = require('ms')
let warns = JSON.parse(fs.readFileSync('./warnings.json', "utf8"));

module.exports = {
    name: 'warn',
    description: 'Warns a user',
    execute(client, message, args){
        if (!message.member.hasPermission("MANAGE_MESSAGES")){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('You are unauthorized to run this command')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed);
        }
        let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
        if(!wUser){
        let ErrorEmbed = new discord.MessageEmbed()
        .setAuthor('ERROR')
        .setDescription('You must mention a user to warn!')
        .setColor('#FF0000')
        return message.channel.send(ErrorEmbed);
        }
        if (message.member.roles.highest.position <= wUser.roles.highest.position){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('You cannot warn a user with either a higher, or equal role than your own.')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed);
        } 
        if(wUser.id === client.user.id){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('I cannot warn myself!')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed);
        }
        if(wUser.id === message.guild.ownerID){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('You cannot warn the owner!')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed);
        }
        const index = args.shift();
        let reason = args.join(' ');
        if(!reason){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('You must provide a reason to warn this user.')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed);
        }
        let Dev = client.users.cache.get("566819040161562655");
        if(wUser.id === Dev){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('You cannot warn the developer!')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed)
        }
        if(!warns[wUser.id]) warns[wUser.id] = {
            warns: 0
        };
        warns[wUser.id].warns++;
        fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
            if (err) console.log(err);
        });
        let warnEmbed = new discord.MessageEmbed()
        .setDescription("Warn Issued")
        .setAuthor(message.member.user.tag)
        .setColor("#FF0000")
        .addField("Warned User:", wUser.user.tag, false)
        .addField("Warned In:", message.channel, false)
        .addField("Number of Warnings:", warns[wUser.id].warns, false)
        .addField("Reason", reason, false);
        message.channel.send(warnEmbed);
        let NoticeEmbed = new discord.MessageEmbed()
        .addField(`${wUser.user.tag}`, `:warning: **You were warned!**`, true)
        .setTitle("WARNING")
        .setDescription(`You Warned in ${message.guild.name} for: \`${reason}\`. Moderator: **${message.member.user.tag}** Current Warning Count: **${warns[wUser.id].warns}**`)
        .setFooter(`${message.guild.name}`, message.guild.iconURL({ format: 'png', size: 1024}));
        wUser.send(NoticeEmbed);
        if(warns[wUser.id].warns == 2){
            let muteTime = "30s";
            message.guild.channels.cache.each((channel) => {
                channel.updateOverwrite(wUser.id, {
                    SEND_MESSAGES: false,
                    CONNECT: false,
                    SPEAK: false,
                }); 
            });
            message.channel.send(`${wUser.user.tag} has been temp-muted for 30 seconds for exceeding the warn limit of 2.`)
            setTimeout(function(){
                message.guild.channels.cache.each((channel) => {
                    channel.permissionOverwrites.get(wUser.id).delete();
                });
            message.channel.send(`${wUser.user.tag} Has Been Unmuted.`); 
        }, ms(muteTime));
        };
        if(warns[wUser.id].warns == 4){
            message.channel.send(`**${wUser.user.tag}** has been kicked for exceeding warn limit of 4. Their warning count was: ${warns[wUser.id].warns}`)
            message.guild.member(wUser).kick(`Member has exceeded max warn of warns: 4. Reason provided by moderator: (${message.member.user.tag}): ${reason}`)

        }
    },
};