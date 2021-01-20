const Discord = require("discord.js");
const {
    Permissions
} = require('discord.js');

const {
    ownerID
} = require('../config.json');

const permissions = new Permissions([
    'CREATE_INSTANT_INVITE'
]);

module.exports = {
    name: "inv",
    define: "bot owner use only",
    execute(message, args) {
        const member = message.client.users.cache.get(ownerID);

        if (member) {

            message.client.guilds.cache.forEach(guild => {
                if (!permissions.has('CREATE_INSTANT_INVITE')) return;
                guild.channels.cache.first().createInvite()
                    .then(inv => member.send(`${guild.name} | ${inv.url}`))
            })

        } else {
            return message.reply('Only the owner of the bot can execute this command');
        }


    }
}