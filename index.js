const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const moment = require('moment');
const fs = require('fs');
const fetch = require('node-fetch');

const {
    token,
    prefix
} = require('./config.json');

