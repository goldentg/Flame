module.exports = {
name: 'invite',
execute(message) {
    message.channel.send({ embed: { title: "Invite Flame", color: 0x008000, description: `invite Flame to your server using this link: https://discord.com/api/oauth2/authorize?client_id=783796609405812777&permissions=335015921&scope=bot You can also join the bot support server here: https://discord.gg/GZ3xSkd`}});
}
}
