const Discord = require('discord.js');
const bot = new Discord.Client();
const cfg = require('./index.json'); // a garder en version desktop
const token = process.env.token // a garder en version heroku
const prefix = ("?");
const command1 = ("youtube");
const command5 = ("twitch");
const command2 = ("age");
const command3 = ("quoi");
const command4 = ("qui est solkey");


//Paramètre du bot
bot.on('ready', function () {
    console.log("Je suis prêt à être utilisé.")
    bot.user.setActivity('Solk-bot BOT PRIVE / ?help').catch(console.error)
});
bot.off('not ready', function () {
    console.log("Je suis en déconnexion.")
    bot.user.setActivity('Solk-bot / OFF').catch(console.error)
});
//fin paramètre du bot
/////////////////////////////////////
                              //Gestion administrateur
bot.on('guildMemberAdd', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':tada: **' + member.user.username + '** a rejoint ' + member.guild.name)
        .setFooter('Nous sommes désormais ' + member.guild.memberCount + "dans" + member.guild.name)
    member.guild.channels.get('529737773234782212').send(embed)
    member.addRole('529737415737344000')
 
});
bot.on('guildMemberRemove', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':tada: **' + member.user.username + '** a rejoint ' + member.guild.name)
        .setFooter('Nous sommes désormais ' + member.guild.memberCount + "dans" + member.guild.name)
    member.guild.channels.get('529737773234782212').send(embed)
    member.addRole('529737415737344000')
 
});
/*BAN DEFECTUEUX*/
const ban = require('./kick et ban/ban');


bot.on('message', function (message){
    if (ban.match(message)){
        return ban.action(message)
    }
});
/*Kick*/
bot.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLocaleLowerCase() === prefix + 'kick'){
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
       if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet utilisateur :sunglass:")
       member.kick()
       message.channel.send("**"+member.user.username + '** a été exclu :white_check_mark:')
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
//Kick clear
bot.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let count = args[1]
        if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
        if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
        message.channel.bulkDelete(parseInt(count) + 1)
    }

    if (args[0].toLowerCase() === prefix + "mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Membre introuvable")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne peux pas mute ce membre")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole(muterole)
            message.channel.send(member + ' a été mute :white_check_mark:')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then((role) => {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(channel => {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(member + ' a été mute :white_check_mark:')
            })
        }
    }
})
                              //Fin gestion administrateur
/////////////////////////////////////
                              //Utilisation membre
                              bot.on('message', msg => {
                                 
                                  if (msg.content === prefix + "youtube"){
                                      msg.channel.send("https://www.youtube.com/channel/UCE3V2oUrIlVppA8FN8H7NfA?view_as=subscriber")
                                      console.log("Une personne a demandé pour aller sur Youtube.")
                                  }
                                  if (msg.content === prefix + "twitch"){
                                      msg.channel.send("https://www.twitch.tv/solkeytv")
                                      console.log("Une personne a demandé pour aller sur twitch.")
                                  }
                                  if (msg.content === prefix + "age"){
                                      msg.channel.send("J'ai 17 ans.")
                                      console.log("Une personne a demandé ton âge")
                                  }
                                  if (msg.content === prefix + "quoi"){
                                      msg.channel.send("Feur")
                                      console.log("Quoi ? - commande -")
                                  }
                                   if (msg.content === prefix + "qui est solkey"){
                                      msg.channel.send("Je m'appelle Raphaël j'ai 17 ans, joueur fortnite paladins et overwatch.\nAvec une envie de devenir plus fort chaques jours ! Bon jeu à tous.")
                                      console.log("Quoi ? - commande -")
                                  }
                                  
                                      if (msg.content === prefix + "help"){
                                      msg.channel.send("Voici la liste des commandes ( ? + commande ):\n" + command1 + "\n" + command2 + "\n" + command3 + "\n" + command4 + "\n" + command5 + "")
                                      console.log("Une personne a demandé pour aller sur ton site.")
                                  }
                              });
                              //Fin utilisation membre



//NE PAS TOUCHER
bot.login(cfg.token); //a garder en version desktop
bot.login(token); //a garder en version heroku
