const discord = require('discord.js');
const noreaction = '❎'
const yesreaction = '✅'

module.exports = {
    name: 'poll',
    async execute(client, message, args){
        let kMessage = args.join(" ")
        if(!kMessage){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('You are missing the arguments!')
            .setColor('#FF0000')
            return message.channel.send(ErrorEmbed)
        }
        let yes = new discord.MessageReaction(message)
        .emoji(yesreaction)
    }
}