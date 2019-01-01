const Discord = require('discord.js');
const bot = new Discord.Client();
const cfg = require('./index.json'); // a garder en version desktop
const token = process.env.token // a garder en version heroku
const prefix = ("?");

bot.on('ready', function () {
    console.log("Je suis prêt à être utilisé.")
    bot.user.setActivity('Solk-bot / ?help').catch(console.error)
});

//test
bot.on('guildMemberAdd', member =>{
  member.guid.channels.get('529622667402412073').send(':tada: **Bienvenue**' + member.user + ':smile: Nous sommes' + member.guild.memberCount)
  console.log('+1')
});
//test

bot.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
        return channel.send('Bienvenue sur le serveur.' + member.displayName)
        console.log(`${member.displayName} vient de rejoindre le serveur.`)
    }).catch(console.error)
});

const ban = require('./kick et ban/ban');


bot.on('message', function (message){
    if (ban.match(message)){
        return ban.action(message)
    }
});


bot.on('message', msg => {
    if (msg.content === "bonjour"){
        msg.reply("Heureux de te revoir parmis nous.")
    }
    if (msg.content.match(/salut/i)) {
            msg.reply('Je suis d\'accord avec toi.')
    }
    if (msg.content === prefix + "youtube"){
        msg.channel.send("https://www.youtube.com/channel/UCE3V2oUrIlVppA8FN8H7NfA?view_as=subscriber")
        console.log("Une personne a demandé pour aller sur ton site.")
    }
        if (msg.content === prefix + "help"){
        msg.channel.send("Voici la liste des commandes : ")
        console.log("Une personne a demandé pour aller sur ton site.")
    }
    if (msg.content === "."){
        msg.channel.send("Sasi, Je t'aime très fort - de la part de ton Evil <3")
    }
       if (msg.content === "aïe"){
        msg.channel.send("ME CASSE PO LE DOS")
    }
});

bot.login(cfg.token); //a garder en version desktop
bot.login(token); //a garder en version heroku
