const discord = require('discord.js');

module.exports = {
    name: "unlock",
    async execute(client, message, args){
      if(!message.member.hasPermission('MANAGE_CHANNELS')){
          let ErrorEmbed = new discord.MessageEmbed()
          .setAuthor('ERROR')
          .setDescription('You are unauthorized to run this command!')
          .setColor('#FF0000')
          return message.channel.send(ErrorEmbed);
      }
      if(!message.guild.members.cache.get(client.user.id).hasPermission('MANAGE_CHANNELS')){
          let ErrorEmbed = new discord.MessageEmbed()
          .setAuthor('ERROR')
          .setDescription('I do not have the permission to run this command!')
          .setColor('#FF0000')
          return message.channel.send(ErrorEmbed);
      }
      let channel = message.mentions.channels.first();
      if(!channel){
        message.channel.updateOverwrite(message.guild.roles.everyone.id, {
         SEND_MESSAGES: true,
         ADD_REACTIONS: true,
        });
        let ErrorEmbed = new discord.MessageEmbed()
        .setAuthor('Unlocked!')
        .setDescription('The channel has been successfully unlocked!')
        return message.channel.send(ErrorEmbed)
      };
      if(channel.guild.id !== message.guild.id){
        let ErrorEmbed = new discord.MessageEmbed()
        .setAuthor('ERROR')
        .setDescription('You can\'t unlock another guild\'s channel!')
        .setColor('#FF0000')
        return message.channel.send(ErrorEmbed);
      };
    },
  };