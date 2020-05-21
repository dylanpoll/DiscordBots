/* eslint-disable no-duplicate-case */
/* eslint-disable default-case */
//----------------------       ctrl+` to start terminal in vscodenode
//for the discord.js library and creating the bot
//----------------------
    const Discord = require('discord.js');
    const bot = new Discord.Client();
    const fetch = require('node-fetch');
    require('dotenv/config');
//----------------------
//prefix for user commands.
//----------------------
    const prefix = '!';
//----------------------
//embedds
//----------------------
    const helpembed = { //the user help menu
        "title": "Karma Bot User Info :",
        "color": 9202888,
        "footer": {
        "text": "if you need help with using these commands, please ask a team lead!"
        },
        "author": {
        "name": "Made by Dylan Poll"
        },
        "fields": [ 
        {"name": "!led : ","value": " on, off, red, white, blue, green."}
        ]};
//----------------------
//Data: objects/static
//----------------------
        const espLink = process.env.espLINK;
        const link = process.env.url;
//----------------------
//bot startup
//----------------------
bot.on('ready', () => {console.log('ESP controller is armed and dangerous...'+link);});
bot.on('message', message=>{ 
//----------------------
//user command tree   
//----------------------
                let command = message.content.substring(prefix.length).split(" "); //tells the bot to search for the prefix, and than a space, and the contents after the sace will be command
                    if(message.author.bot) return; // tell the bot to ignore comments made by bots.
        switch(command[0]){ case 'help'         :   message.channel.send({embed: helpembed});  //prints help
                                break;
                            case 'led'          :   try{let espcommand;
                                            // eslint-disable-next-line default-case
                                            switch(command[1]){
                                                case 'off'  :   try{espcommand = '?LED0=OFF';}catch{console.log("esp command error");}
                                                    break;
                                                case 'on'   :   try{espcommand = '?LED0=ON';}catch{console.log("esp command error");}
                                                    break;
                                                case 'white':   try{espcommand = '?color=w';}catch{console.log("esp command error");}
                                                    break;
                                                case'red'   :   try{espcommand = '?color=r';}catch{console.log("esp command error");}
                                                    break;
                                                case 'blue' :   try{espcommand = '?color=b';}catch{console.log("esp command error");}
                                                    break;
                                                case 'green':   try{espcommand = '?color=g';}catch{console.log("esp command error");}
                                                    break;
                                                }
                                            espcommand = espLink+espcommand;
                                            ping(espcommand).then(message.channel.send('turning LED '+(command[1])));
                                            async function ping(espcommand){try{ await fetch(espcommand, { method: 'VIEW'});}catch{message.channel.send("LED controll error...");}}
                                                        }catch{console.log("led switch broke");}
                                break;}
//----------------------
//ASYNC DATA VALIDATION
//----------------------
            async function filterInt(number) {if (/^[-+]?(\d+|Infinity)$/.test(number)) {return Number(number)} else {return "";}}
})//end of main body
//----------------------
//bot token
//----------------------
bot.login(process.env.botToken);
