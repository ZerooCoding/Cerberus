const discord = require('discord.js');

module.exports = {
    name: 'faq',
    execute(client, message, args){
        let FAQEmbed = new discord.MessageEmbed()
        .setAuthor('FAQ')
        .addField('Q: What is Cerberus made with?', 'A: Cerberus is made with discord.js, a node.js module and I personally recommend it to any new developers out there.', false)
        .addField('Q: Is Cerberus open-source?', 'A: Yes! Cerberus is open-source as a learning process for me and for any new developers out there.', false)
    },
};