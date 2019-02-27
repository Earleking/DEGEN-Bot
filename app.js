const dotenv = require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();



const functions = {
    "%ping": require('./functions/ping'),
    "%airing": require("./functions/airing")
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
    if(!msg.content.startsWith("%"))
        return;
    
    var command = msg.content.split(" ")[0];
    if (functions[command]) {
        console.log(functions[msg.content]);
        functions[command](msg, getArgs(msg.content));
    }
});

function getArgs(msg) {
    var msgArr = msg.split(" ");
    msgArr.shift();
    return msgArr;
}

client.login(process.env.DISCORD_TOKEN);