const discord = require('discord.js');

module.exports = {
    name: 'rules',
    execute(client, message, args){
        let Dev = client.users.cache.get("566819040161562655");
        if(!message.author.id === Dev){
            let ErrorEmbed = new discord.MessageEmbed()
            .setAuthor('ERROR')
            .setDescription('This command is Dev-only!')
            return message.channel.send(ErrorEmbed);
        };
                
        let RulesEmbed = new discord.MessageEmbed()
        .setAuthor('Cerberus Community Rules')
        .addField('General Chat Rules', '➪No blank nicknames.\n➪No inappropriate nicknames.\n➪No sexually explicit nicknames.\n➪No offensive nicknames.\n➪No nicknames with unusual or unreadable Unicode.\n➪No inappropriate profile pictures.\n➪No sexually explicit profile pictures.\n➪No offensive profile pictures.\n➪Moderators reserve the right to change nicknames.\n➪Moderators reserve the right to use their own discretion regardless of any rule.\n➪No exploiting loopholes in the rules (please report them).\n➪No DM advertising other members of the server.\n➪No inviting unofficial bots.\n➪No bugs, exploits, glitches, hacks, bugs, etc.', false)
        .addField('Text Channel Rules (These can only be excepted by correct channel use)', '➪Keep conversations in English.\n➪No asking to be granted roles/moderator roles.\n➪No sexually explicit content.\n➪No illegal content.\n➪No publishing of personal information (including real names, addresses, emails, passwords, bank account and credit card information, etc.).\n➪No harassment.\n➪No walls of text (either in separate posts or as a single post).\n➪No offtopic/use the right text channel for the topic you wish to discuss.', false)
        .addField('Voice Chat Rules', '➪No voice chat channel hopping.\n➪No annoying, loud or high pitch noises.\n➪Reduce the amount of background noise, if possible.\n➪Moderators reserve the right to disconnect you from a voice channel if your sound quality is poor.\n➪Moderators reserve the right to disconnect, mute, deafen, or move members to and from voice channels.', false)
        return message.channel.send(RulesEmbed); 
    },
};