const discord = require('discord.js');

module.exports = {
  name: 'scriptview',
  execute(client, message, args) {
    const script = args.join(' ');
    if(!script){
        
      let ErrorEmbed = new discord.MessageEmbed()
      
      .setAuthor('ERROR')
      
      .setDescription('You must have a script to present!')
      
      .setColor('#FF0000')
      
      return message.channel.send(ErrorEmbed);
    };

    let embed = new discord.MessageEmbed()
      
    .setAuthor('SCRIPT')
    
    .setDescription(`\`\`\`${script}\`\`\``);
    
    return message.channel.send(embed);
  },
};