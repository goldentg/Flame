const Discord = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'displays all info about a user',
    usage: '-userinfo <@user>',
    cooldown: 5,
    execute(message, args) {
       
            let user = message.mentions.users.first();
            if(!user) user = message.author;
            const embed = new Discord.MessageEmbed()
                            .setColor(0x7289DA)
                            .setImage(user.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
                            .setFooter(`${user.username}'s account was created ${user.createdAt}`)
             message.channel.send({embed});
          }

        };
    