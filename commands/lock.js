const discord = require('discord.js');

module.exports = {
    name: "lock",
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
         SEND_MESSAGES: false,
         ADD_REACTIONS: false,
        });
        let ErrorEmbed = new discord.MessageEmbed()
        .setAuthor('Locked!')
        .setDescription('The channel has been successfully locked down!')
        return message.channel.send(ErrorEmbed)
      };
      if(channel.guild.id !== message.guild.id){
        let ErrorEmbed = new discord.MessageEmbed()
        .setAuthor('ERROR')
        .setDescription('You can\'t lock down another guild\'s channel!')
        .setColor('#FF0000')
        return message.channel.send(ErrorEmbed);
      };
    },
  };