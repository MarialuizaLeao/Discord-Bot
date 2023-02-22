// variable to hold reference to the discord.js node module
const Discord = require("discord.js");  // para acessar a aplicação

// contains a string that is the password/token for the discord bot
const { token } = require("./config.json");

// Gateway Intents were introduced by Discord so bot developers can choose
// which events their bot receives based on which data it needs to function
// With partials we will be able to receive the full data of the objects returned from each event
const Client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.DirectMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.Guilds
    ], partials: [
        Discord.Partials.Message,
        Discord.Partials.Channel,
        Discord.Partials.GuildMember,
        Discord.Partials.User,
        Discord.Partials.GuildScheduledEvent
    ]
}); // Creating a new Client with intents and partials needed for this bot to function.
// partials makes sure that we receive the full data of the object returned from events

// Ready event captures the state when the bot gets online
Client.on("ready", (client) => {
    console.log("This bot is now online: " + client.user.tag);
});

// messageCreate  event captures data of a message that is created/posted
Client.on("messageCreate", (message) => {
    // message content to lower case
    const userInputText = message.content.toLowerCase();

    // only allow non-bots to perform any code execution
    if(message.author.bot){ 
        return; 
    }
    console.log("a new message was written!");

    // only run this code is the user that wrote the message is NOT a bot
    //if(!message.author.bot){
    //    message.reply("Oii, " + message.author.username + "!");
    //}

    // comands
    if(userInputText == "!comandinhos" || userInputText == "!ajudinha"){
        message.reply("Esse robô tem os comandos: !ajudinha !comandinhos !idade !matematica")
    }

});


// server age and member's age in server

// Logs in the discord bot with the password stored in an external file
Client.login(token);