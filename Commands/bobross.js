module.exports = {
    name: 'bobross',
    definition: 'sends a random bob ross episode',
    execute(message) {
        message.channel.send('enjoy a random episode of The Joy of Painting <https://mityurl.com/y/cDIn/r>');
    }
}