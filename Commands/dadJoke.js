var giveMeAJoke = require('give-me-a-joke');

module.exports = {
    name: 'dadJoke',
    description: 'Sends a dad joke',
    execute(message) {
        giveMeAJoke.getRandomDadJoke (function(joke) {
            message.channel.send({ embed: { title: "Dad Joke", color: 0x008000, description: `${joke}`}});
        });
    }
}