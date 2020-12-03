const Discord = require('discord.js');
const figlet = require('figlet');

module.exports = {
    name: "ascii",
    description: 'turns text to ascii',
    cooldown: 20,
    execute (message, args) {

        let ascimes = args.join(' ');
if(ascimes.length < 0) return message.channel.send("```Cannot find a message to ASCII```")

figlet(ascimes, function(err, data) {
    if (err) {
        message.channel.send("Something went wrong!")
        console.dir(err);
        return;
    }
    message.channel.send("```" + data + "```")
});

    }
};



