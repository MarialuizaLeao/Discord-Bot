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
        message.reply("Esse robô tem os comandos: !ajudinha !comandinhos !idade");
    }

    const pcOptions = ["pedra", "papel", "tesoura"];

    const pcRoll = Math.floor(Math.random() * 3);

    if(userInputText == "pedra"){
        let statusMessage = "";
        if(pcOptions[pcRoll] == "pedra"){
            statusMessage = "empate";
            //saveGameData(message.author.id, message.author.tag);
            saveGame(message.author.id, message.author.tag, "empatou");
        }
        else if(pcOptions[pcRoll] == "papel"){
            statusMessage = "ganhou, gayyyy";
            //saveGameData(message.author.id, message.author.tag);
            saveGame(message.author.id, message.author.tag, "ganhou");
        }
        else if(pcOptions[pcRoll] == "tesoura"){
            statusMessage = "se fudeu";
            //saveGameData(message.author.id, message.author.tag);
            saveGame(message.author.id, message.author.tag, "perdeu");
        }
        message.reply(pcOptions[pcRoll]);
        message.reply(statusMessage);


    }
    else if(userInputText == "papel"){
        let statusMessage = "";
        if(pcOptions[pcRoll] == "pedra"){
            statusMessage = "ganhou, gayyyy";
            //saveGameData(message.author.id, message.author.tag);
            saveGame(message.author.id, message.author.tag, "ganhou");
        }
        else if(pcOptions[pcRoll] == "papel"){
            statusMessage = "empate";
            //saveGameData(message.author.id, message.author.tag);
            saveGame(message.author.id, message.author.tag, "empatou");
        }
        else if(pcOptions[pcRoll] == "tesoura"){
            statusMessage = "se fudeu";
            //saveGameData(message.author.id, message.author.tag);
            saveGame(message.author.id, message.author.tag, "perdeu");
        }
        message.reply(pcOptions[pcRoll]);
        message.reply(statusMessage);

    }
    else if(userInputText == "tesoura"){
        let statusMessage = "";
        if(pcOptions[pcRoll] == "pedra"){
            statusMessage = "se fudeu";
            //saveGameData(message.author.id, message.author.tag);
            saveGame(message.author.id, message.author.tag, "perdeu");
        }
        else if(pcOptions[pcRoll] == "papel"){
            statusMessage = "ganhou, gayyyy";
            //saveGameData(message.author.id, message.author.tag);
            saveGame(message.author.id, message.author.tag, "ganhou");
        }
        else if(pcOptions[pcRoll] == "tesoura"){
            statusMessage = "empate";
            //saveGameData(message.author.id, message.author.tag);
            saveGame(message.author.id, message.author.tag, "empatou");
        }
        message.reply(pcOptions[pcRoll]);
        message.reply(statusMessage);
    }
    // display game list
    else if(userInputText == "jogos"){
        message.reply(gameList());
    }
    //display stats of a specific game
    else if(Number(userInputText)){
        message.reply(displayGame(Number(userInputText)));
    }
        
});

function displayGame(ID){
    const data = returnGameData(); // gamedata.json
    let replyMessage = undefined; // default undefined if no game is found
    let found = false; // default false if the specific ID doesn't exist
    // if we find a game
    if(data.length > 0){
        replyMessage = "";
    }
    // find specific game in the array
    for(let i = 0; i < data.length; i++){
        if(ID == data[i].ID){
            found = true; // turned to true since we found the game
            replyMessage = data[i].name + " vs PC\nVitorias: " + data[i].ganhou + "\n"
                                               + "Derrotas: " + data[i].perdeu + "\n"
                                               + "Empates: " + data[i].empatou + "\n"
                                               + data[i].time;              ;
        }
    }
    // still undefined if no games are found
    if(replyMessage == undefined){
        return "Não existem jogos";
    }
    // couldn't find the specific game so found is still false
    else if(!found){
        return "Não consegiu encontrar esse específico jogo"
    }
    return replyMessage;
}

// get data from gamedata.json and return a list of games
function gameList(){
    const data = returnGameData(); // gamedata.json
    let replyMessage = undefined; // default undefined if no game is found
    // if we find a game
    if(data.length > 0){
        replyMessage = "";
    }
    // loop through all games and construct a reply message
    for(let i = 0; i < data.length; i++){
        replyMessage += "Escreva <" + data[i].ID + "> para ver o resultado desse jogo\n";
    }
    // still undefined if no games are found
    if(replyMessage == undefined){
        return "Não existe nenhum jogo";
    }

    return replyMessage;
}

function saveGame(userID, name, gameStatus){
    let gameData = returnGameData(); // get data from gamedata.json
    let newGame = true; // default true unless we find a game by the player with rounds less than 3

    // loop through gamedata.json array
    for(let i = 0; i < gameData.length; i++){
        // if user exist within a game and the rounds of that game is less than 3. (0, 1, 2)
        if(gameData[i].userID == userID && gameData[i].rounds < 3){
            newGame = false;
            gameData[i].rounds++; // increase rounds
            gameData[i][gameStatus]++; // increase the property of draw, win or lose
        }
    }
    // if we should still create a new game between player and pc
    if(newGame){
        let newGameObject = returnNewGameObject(userID, name);
        newGameObject.ID = gameData.length + 1;
        newGameObject[gameStatus]++;
        newGameObject.rounds++;

        // if array is empty
        if(gameData.length < 1){
            gameData = [newGameObject]; // the empty array is replaced by array with 1 object inside
        }
        else if(gameData.length > 0){
            gameData.push(newGameObject); // push object into the back of the array
        }
    }

    saveGameData(gameData);

}

function saveGameData(data){
    const fs = require("fs");
    const path = "./gamedata.json";
    fs.writeFileSync(path, JSON.stringify(data));
}

function returnGameData(){
    const fs = require("fs");
    const path = "./gamedata.json";
    const encoding = "utf-8";
    return JSON.parse(fs.readFileSync(path, encoding));
}

function returnNewGameObject(userID, name){
    return{
        ID : 0,
        userID : userID,
        name : name,
        empatou : 0,
        ganhou : 0,
        perdeu : 0,
        rounds : 0,
        time : new Date().toString()
    }
}


// server age and member's age in server

// Logs in the discord bot with the password stored in an external file
Client.login(token);