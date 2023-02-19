// variable to hold reference to the discord.js node module
const Discord = require("discord.js");

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