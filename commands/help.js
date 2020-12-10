const discord = require('discord.js');
const prefix = '^^^';

module.exports = {
    name: 'help',
    description: 'List of commands',
    execute(client, message, args){
        let HelpEmbed = new discord.MessageEmbed()
        .setAuthor('Commands for Cerberus')
        .setFooter(`Requested by ${message.author.tag} || Invite the bot to your server! "${prefix}invite" || Note that all commands are lowercase.`)
        .addField('Moderation', '\`Kick\`, \`Ban\`, \`Mute (WIP)\`, \`Unmute (WIP)\`, \`Lock\`, \`Unlock\`, \`Warn\`, \`Warnlevel (WIP)\`, \`Removewarns (WIP)\`, \`Purge\`', false)
        .addField('Miscellaneous', '\`8ball\`, \`Avatar\`, \`Fitnessgram\`, \`Mail\`, \`Ping\` \`Poll (WIP)\` \`Say\`, \`Userphone (WIP)\`')
        .addField('Info', '\`FAQ\`, \`Help\`, \`Info\`, \`Serverinfo\`, \`Userinfo\` \`Vote (WIP)\`')
        .addField('Bot-Related', '\`Invite\`, \`Report\`')
        .addField('Dev-Only', '\`Scriptview\`, \`Eval\`, \`Rules\`')
        return message.channel.send(HelpEmbed)
    },
};