const discord = require('discord.js')

module.exports = {
    name: '8ball',
    execute(client, message, args){
        const kMessage = args.join(" ")
        if(!kMessage){
            
            let ErrorEmbed = new discord.MessageEmbed()
            
            .setAuthor('ERROR')
            
            .setDescription('You must write something!')
            
            .setColor('#FF0000')
            
            return message.channel.send(ErrorEmbed);
        }
        
        
        const responses = [
            
            "Yes",
            
            "Highly Likely",
            
            "Probably",
            
            "Uncertain",
            
            "Unlikely",
            
            "Highly Unlikely",
            
            "No"
            
        ] // These are only some responses of 8ball, add other ones if you want.
        const randomResponse = Math.floor(Math.random() * (responses.length - 1) + 1);
        
        const embed = new discord.MessageEmbed()
        
        .setTitle('Magic 8Ball')
        
        .setDescription(`**Question:** ${kMessage}\n**Answer:** ${responses[randomResponse]}`)
        
        .setTimestamp()
        
        return message.channel.send(embed)
    },
};