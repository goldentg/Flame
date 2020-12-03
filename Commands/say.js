module.exports = {
    name: 'say',
    desription: 'requires administrative permissions',
    execute(message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You do not have the permissions to do this');
        if (!args[0]) return message.reply('You must say something for the bot to say');
        const words = args.join(" ");
        message.channel.send(words)
        message.delete()
    }
}