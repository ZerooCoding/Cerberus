const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const Token = (''); // Nothing due to token stealers out there
let Bot_Name = "Cerberus";
const prefix = "^^^";


client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.once("ready", () => {
  console.log(`${Bot_Name} Ready!, Going Online!`);
  client.user.setActivity(`${client.guilds.cache.size} Guilds || ${prefix}help`, {type: 'WATCHING'})
});

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command)
}

client.on("message", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.guild === null){
        return;
    };
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    if (!client.commands.has(commandName)){
        let ErrorEmbed = new Discord.MessageEmbed()
        .setAuthor('ERROR')
        .setDescription(`\"${commandName}\" is not recognized as a command!`)
        .setColor('#FF0000')
        return message.channel.send(ErrorEmbed)
    };
    const command = client.commands.get(commandName);
    try{
        command.execute(client, message, args);
    }catch(error){
        console.log(error);
        let ErrorEmbed = new Discord.MessageEmbed()
        .setAuthor('ERROR')
        .setDescription('Something went wrong, contact developer at `Autumn The Protogen#0017`.')
        .setColor('#FF0000')
        return message.channel.send(ErrorEmbed);
    }
})

client.on("message", message => {
    if(message.content === '<@!759218208535609395>') {
        message.reply(`\`${prefix}\` is my prefix!`)
    }
})

client.login(Token);
