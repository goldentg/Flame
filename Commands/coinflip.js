const Discord = module.require('discord.js');

var coin = [
    "heads",
    "tails"
            ];

module.exports = {
    name: 'coinflip',
    description: 'flips a coin',
    cooldown: '5',
    execute(message,args) {

        var side = coin[Math.floor(Math.random() * coin.length)]
        message.channel.send({ embed: { title: "Coinflip", color: 0x008000, description: `the coin landed ${side}`}});
    }
    
}