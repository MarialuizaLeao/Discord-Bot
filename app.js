// variable to hold reference to the discord.js node module
const Discord = require("discord.js");  // para acessar a aplicação

// contains a string that is the password/token for the discord bot
const { token } = require("./config.json")

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
})

// Logs in the discord bot with the password stored in an external file
Client.login(token);