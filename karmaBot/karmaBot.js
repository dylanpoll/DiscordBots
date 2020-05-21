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
//Data: objects/static
//----------------------
    const espLink = process.env.espLINK;
    const link = process.env.url;
//----------------------
//bot startup
//----------------------
    bot.on('ready', () => {console.log('Karma system is armed and dangerous...');});
    bot.on('message', message=>{ 
    //----------------------
    //user command tree   
    //----------------------
        let command = message.content.substring(prefix.length).split(" ");          //tells the bot to search for the prefix, and than a space, and the contents after the sace will be command
            if(message.author.bot) return; // tell the bot to ignore comments made by bots.
            switch(command[0]){ case 'help'         :   message.channel.send({embed: helpembed});  //prints help
                                    break;
                                case 'delete'       :   try{if(!command[1]) return message.reply('please put in the amount of messages you want to delete...') //this states if there isn't a number given than ignore the command.
                                                            message.channel.bulkDelete(command[1]).then(console.log("successful delete."));}catch{console.log("error deleting..")}
                                    break;
                                case 'karma'        :   try{let code = message.author.id; getUserKarma(code).then(content =>message.channel.send(content)); }catch{console.log("profile select err");}
                                    break;
                                case 'profile'      :   try{let code = message.author.id; theProfile(code).then(content => message.channel.send({embed: content}));}catch{console.log("my profile select err");}
                                    break;
                                case 'viewProfile'  :   try{let members = message.mentions.users.first(); let code = members.id; theProfile(code).then(content => message.channel.send({embed: content}));}catch{console.log("view profile select err");}
                                    break;
                                case 'add.karma'    :   try{let member = message.mentions.users.first();let code = member.id;let number = (command[1]);updateKarma(code,number).then(content => message.channel.send(content)); }catch{message.channel.send("failed adding karma...");}
                                    break;}
   })//end of main body
//----------------------
//ASYNC GET USER DATA
//----------------------
            async function getname(code){
                try{let url = link+'/users/findUserDataByDiscordID/'+code+'/name';let response = await fetch(url, { method: 'GET'});let content = response.text();
                                    return content;}catch{console.log("failed in getname");}}
            async function getLevel(code){          
                        try{let url = link+'/users/findUserDataByDiscordID/'+code+'/level';let response = await fetch(url, { method: 'GET'});let content = response.text();
                                    return content;}catch{console.log("failed in getlevel");}}
            async function getroles(code){
                try{let url = link+'/users/findUserDataByDiscordID/'+code+'/roles';let response = await fetch(url, { method: 'GET'});let content = response.text();
                                    return content;}catch{console.log("failed in roles");}}
            async function getskills(code){          
                try{let url = link+'/users/findUserDataByDiscordID/'+code+'/skills';let response = await fetch(url, { method: 'GET'});let content = response.text();
                                    return content;}catch{console.log("failed in skills");}}
            async function getUserKarma(code){
                try{let url = link+'/users/findUserDataByDiscordID/'+code+'/karma';let response = await fetch(url, { method: 'GET'});let content = response.text();
                                    return content;}catch{console.log("failed in get karma");}}
            async function getStreak(code){
                try{let url = link+'/users/findUserDataByDiscordID/'+code+'/streak';let response = await fetch(url, { method: 'GET'});let content = response.text();
                                    return content;}catch{console.log("failed in get streak");}}
            async function getdbID(code){
                try{let url = link+'/users/findUserDataByDiscordID/'+code+'/_id';let response = await fetch(url, { method: 'GET'});let content = response.text();
                                    return content;}catch{console.log("failed in get _id");}}
//----------------------
//ASYNC CHANGE USER DATA
//----------------------
            async function patchKarma(code,patchIt){
                try{let url = link+'/users/changekarma/'+code+'/'+patchIt;let response = await fetch(url, { method: 'PATCH'}); 
                                        return response;}catch{console.log("words")}}
            async function updateKarma(code,number){
                try{let karma;let content;let change;let name;change = await filterInt(number);await getUserKarma(code).then(content => number = content);
                        karma = await filterInt(number);await getname(code).then(content => name = content);await getdbID(code).then(content => code = content);
                        code = code.replace(/"/g, "");name = name.replace(/"/g, "");number = (karma+change);
                        let patchIt = await filterInt(number);
                        await patchKarma(code,patchIt).then(console.log("changed karma"));content = (name+" now has : "+patchIt+" karma points!");
                                        return content;}catch{message.channel.send("Failed adding karma...");}}
//----------------------
//ASYNC DATA VALIDATION
//----------------------
            async function filterInt(number) {if (/^[-+]?(\d+|Infinity)$/.test(number)) {return Number(number)} else {return "";}}
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
        {"name": "!delete (number) : ","value": " deletes comments including and above."},
        {"name": "!profile : ","value": " prints your profile."},
        {"name": "!viewProfile @mentionedUser : ","value": " shows you the mentioned users profile."},
        {"name": "!add.karma (number) @mentionedUser : ","value": " adds karma to the user."}
        ]};
        //----------------------
        //ASYNC profile
        //----------------------
                    async function theProfile(code){
                        try{let karma;let role;let skills;let name;let content; let streak;let level;
                            await getname(code).then(content => name = content);name = name.replace(/"/g, "");
                            await getUserKarma(code).then(content => karma = content);
                            await getLevel(code).then(content => level = content);level = level.replace(/"/g, "");
                            await getroles(code).then(content => role = content);role = role.replace(/"/g, "");
                            await getskills(code).then(content => skills = content);skills = skills.replace(/"/g, "");
                            await getStreak(code).then(content => streak = content);streak = streak.replace(/"/g, "");
                            const profileEmbed = {//profile card
                                    "title": name+"s profile :",
                                    "color": 9202888,
                                    "footer":{
                                    "text": " still being built"
                                    },
                                    "fields": [ 
                                    {"name": "Level: ","value": level},
                                    {"name": "Role: ","value": role},
                                    {"name": "Skills: ","value": skills},
                                    {"name": "Karma: ","value": karma},
                                    {"name": "Streak: ","value": streak}
                                    ]};
                                content = profileEmbed; 
                                return content;
                           }catch{console.log("failed in profile");}
                        }
//----------------------
//bot token
//----------------------
bot.login(process.env.botToken);
