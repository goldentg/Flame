var oneLinerJoke = require('one-liner-joke');

module.exports = {
    name: 'joke',
    description: 'Sends a joke',
    execute(message) {
        var getRandomJoke = oneLinerJoke.getRandomJoke();
        message.channel.send({ embed: { title: "Joke", color: 9384170, description: `${getRandomJoke.body}`}});
    }
}