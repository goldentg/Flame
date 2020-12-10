const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const Keyv = require('keyv');
const keyv = new Keyv();

const chalk = require('chalk');
const moment = require('moment');
const fs = require('fs');
const fetch = require('node-fetch');

var dt = new Date();
var utcDate = dt.toUTCString();

const {
    token,
    prefix
} = require('./config.json');

const activities_list = [
    "Flame Development",
    "-help for help",
    "https://github.com/goldentg/Flame",
    "Flame Development"
];



client.once('ready', () => {
    
    const promises = [
        client.shard.fetchClientValues('guilds.cache.size'),
        client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
    ];

    return Promise.all(promises)
        .then(results => {
            const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
            const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
            return console.log(chalk.green(`${utcDate}\nServer count: ${totalGuilds}, Member count: ${totalMembers}, Channel Count: ${client.channels.cache.size}`));
        })
        .catch(console.error);
});

//log stats when bot is added to new server
client.on("guildCreate", guild => {
    console.log(chalk.green(`${utcDate}\nJoined a new guild: ` + guild.name));
    console.log(chalk.green(`Flame is now in ${client.guilds.cache.size} servers`));
})

//log stats when bot is removed from a server
client.on("guildDelete", guild => {
    console.log(`${utcDate}\nLeft a guild: ` + guild.name);
    console.log(`Flame is now in ${client.guilds.cache.size} servers`);
})

//set bot presence 
client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index], {
            type: 'WATCHING'
        }); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.
});

//command handler framework
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./Commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }



});

keyv.on('error', err => console.error('Keyv connection error:', err));

client.login(token);