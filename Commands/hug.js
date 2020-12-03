module.exports = {
    name: 'hug',
    decription: 'Give a hug to a user',
    usage: '-hug <@user>',
    cooldown: 15,
    execute(message, args) {
        let target = message.mentions.users.first();
        if (!target) return message.reply('You must mention a user to  hug');
        if (target == message.author) return message.channel.send(`${message.author} hugged themself. how sad :(`);
        message.channel.send(`${message.author} gave ${target} a hug!`);
    }
}