const Discord = require('discord.js');
const bot = new Discord.Client();
const cfg = require('./index.json'); // a garder en version desktop
const token = process.env.token // a garder en version heroku
const prefix = ("?");
const command1 = ("bonjour");

//Paramètre du bot
bot.on('ready', function () {
    console.log("Je suis prêt à être utilisé.")
    bot.user.setActivity('Solk-bot / ?help').catch(console.error)
});
bot.off('not ready', function () {
    console.log("Je suis en déconnexion.")
    bot.user.setActivity('Solk-bot / OFF').catch(console.error)
});
//fin paramètre du bot
/////////////////////////////////////
                              //Gestion administrateur
bot.on('guildMemberAdd', member =>{
  member.guid.channel.get('529631890286706710').send('Bienvenue' + member.displayName + 'Nous sommes' + member.guild.memberCount)
  console.log('+1')
});

bot.on('guildMemberAdd', member =>{
  let embed = new Discord.RichEmbed()
     .setDescription('Test' + member.displayName + ' test' + member.guild.name)
     .setFooter('Nous sommes désormais' + member.guild.memberCount)
     member.guild.channel.get('529631890286706710').send(embed)
})
bot.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
        return channel.send('Bienvenue sur le serveur.' + member.displayName)
        console.log(`${member.displayName} vient de rejoindre le serveur.`)
    }).catch(console.error)
});
/*BAN DEFECTUEUX*/
const ban = require('./kick et ban/ban');


bot.on('message', function (message){
    if (ban.match(message)){
        return ban.action(message)
    }
});
/*Ban*/
bot.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLocaleLowerCase() === prefix + 'ban'){
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
       if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur :sunglass:")
       message.guild.ban(member, {days: 7})
       message.channel.send("**"+member.user.username + '** a été banni :white_check_mark:')
    }
});
                              //Fin gestion administrateur
/////////////////////////////////////
                              //Utilisation membre
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
                                      msg.channel.send("Voici la liste des commandes ( ? + commande ):\nyoutube\n" + command1 + "\ntest")
                                      console.log("Une personne a demandé pour aller sur ton site.")
                                  }
                                  if (msg.content === "."){
                                      msg.channel.send("Sasi, Je t'aime très fort - de la part de ton Evil <3")
                                  }
                                     if (msg.content === "aïe"){
                                      msg.channel.send("ME CASSE PO LE DOS")
                                  }
                              });
                              //Fin utilisation membre



//NE PAS TOUCHER
bot.login(cfg.token); //a garder en version desktop
bot.login(token); //a garder en version heroku
