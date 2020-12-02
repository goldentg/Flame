const Discord = require('discord.js');
const figlet = require('figlet');
const { member, client, message } = require('../index.js');


module.exports = {
    name: "ascii",
    description: 'turns text to ascii',
    cooldown: 60,
    execute (message, args) {
if (message.member.roles.cache.some(r => ["Tranimum Games"].includes(r.name))) {
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
    }
};



