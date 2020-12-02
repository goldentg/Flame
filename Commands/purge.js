const Discord = require('discord.js');

module.exports = {
	name: 'purge',
	description: 'Clear up to 499 messages.',
	guildOnly: true,
	execute(message, args) {

        if (message.member.hasPermission("MANAGE_MESSAGES")) {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.channel.send({embed: { color: 0xFF0000, title: "Error!", description: "Please provide a number between 2 and 100." } });
		} else if (amount <= 1 || amount > 500) {
			return message.reply('you need to input a number between 1 and 99.');
		}
        message.channel.send({ embed: { title: "Messages Purged", color: 0x008000, description: `I have purged ${amount - 1}  messages!`}});
		message.channel.bulkDelete(amount, true).catch(err => {
            
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
        });
    } else {
       return message.channel.send({embed: { color: 0x7289DA, title: "<:BlurpleOutage:543908084343504907> Missing Permissions", description: "You need mederator perms to do this" }});
    }
	},
};

