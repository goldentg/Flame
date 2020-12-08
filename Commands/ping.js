module.exports = {
    name: 'ping',
    execute(message) {
        message.channel.send('Pinging...')
    .then(m => {
      m.edit(`Pong! took \`${m.createdTimestamp - message.createdTimestamp}\`ms`)
    })
    }
}