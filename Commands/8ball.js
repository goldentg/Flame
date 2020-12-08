const Discord = require('discord.js');

module.exports = {
    name: '8ball',
    execute(message, args) {
        
        var ballMessages = [
            "yes",
            "no",
            "maybe"
        ]
        var ballMsg = ballMessages[Math.floor(Math.random() * ballMessages.length)]

        let msg = args.join(' ');
        if(msg.length < 0) return message.reply('You must write a mesage for your fortune');
        message.channel.send({ embed: { title: "8 Ball", color: 0x008000, description: `Response: ${ballMsg}`}});
    }
}