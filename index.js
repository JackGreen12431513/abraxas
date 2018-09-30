const discord = require('discord.js');
var client = new discord.Client();
require('dotenv').config()
const fs = require('fs');
var memes = require('dankmemes');
const math = require('mathjs');

const prefix = "$$";
const embColor = 0x3C2D7F;

const userData = JSON.parse(fs.readFileSync('./Data/userData.json', 'utf8'));

client.on('ready', () => {
    client.user.setActivity("on " + client.guilds.size + " guilds | $$help")
})

client.on('message', message => {

    if(message.channel.type == 'dm') {
        message.channel.send("Sorry, you can not use commands in DM's!").then(msg => {
            msg.delete(3000)
            message.delete(2)
        })
    } else {
        
    }

    if(!userData[message.author.id]) userData[message.author.id] = {
        warns: 0,
        tag: message.author.tag,
        coins: 0,
        rep: 0
    }
    write(1)

    userData[message.author.id].coins++;

    if(!message.content.startsWith(prefix)||message.author.bot) return;
    var args = message.content.substring(prefix.length).split(' ');

    switch(args[0].toLowerCase()) {

        case "help":
        if(!args[1]) {
            var embed = new discord.RichEmbed()
            .setAuthor("Abraxas Help", client.user.avatarURL)
            .addField("General", "`$$help general`")
            .setColor(embColor)
            message.channel.send(embed)
        } else if(args[1] == "general") {
            var embed = new discord.RichEmbed()
            .addField("General", "`dankest, links, qprofile, maths, tellus`")
            .setColor(embColor)
            message.channel.send(embed)
        }
        break;

        case "dankest":
        memes('day', args[1], function(err, data) {
            var items = JSON.parse(JSON.stringify(data))
            var embed = new discord.RichEmbed()
            .setAuthor("Dankest Meme Leaderboard")
            .addField("🥇 #1", items[1])
            .addField("🥈 #2", items[2])
            .addField("🥉 #3", items[3])
            .setThumbnail(items[1])
            .setColor(embColor)
            message.channel.send(embed)
        })
        break;

        case "links":
        var embed = new discord.RichEmbed()
        .setAuthor("Abraxas Links:", client.user.avatarURL)
        .addField("<:github:495625098720444426> GitHub:", "null")
        .addField("<:twitter:495626854615482383> Twitter:", "https://twitter.com/Abraxas56831878")
        .setColor(embColor)
        message.channel.send(embed)
        break;

        case "qprofile":
        message.channel.send(`\`\`\`css\n${message.author.username}'s Profile\n ID: [${message.author.id}]\n Reputation: [${userData[message.author.id].rep}]\n Coins: [${userData[message.author.id].coins}]\n Warns: [${userData[message.author.id].warns}]\`\`\``)
        break;

        case "profile":
        var user = message.mentions.members.first();
        if(!user) {
            user = message.author;
            var embed = new discord.RichEmbed()
            .setAuthor(``)
        } else {

        }
        break;

        case "maths":
        if(!message.content.replace(prefix + "maths", "").replace(" ", "")) return message.channel.send("Please send a calculation!")

        let resp;
        try {
            resp = math.eval(message.content.replace(prefix + "maths", "").replace(" ", ""));
        } catch(e) {
            return message.channel.send("Invalid calculation!")
        }

        var embed = new discord.RichEmbed()
        .setColor(embColor)
        .setTitle("Abraxas Calculator!")
        .addField('Input:', `\`\`\`js\n${message.content.replace(prefix + "maths", "").replace(" ", "")}\`\`\``)
        .addField('Output:', `\`\`\`js\n${resp}\`\`\``)
        message.channel.send(embed)
        break;

        case "tellus":
        const repchan = client.guilds.get("495678277319655429").client.channels.get('495990816918208533');
        let reportFor = message.content.replace(prefix + "tellus", "").replace(" ", "");
        let reportBy = message.author;
        if(reportFor)
        {
            var embed = new discord.RichEmbed()
            .setTitle("Abraxas Report")
            .addField("Report:", reportFor)
            .setFooter(`Report by: ${reportBy.tag} | ` + Date())
            .setColor(embColor);
            repchan.send(embed)
        } else {
            message.channel.send("Please input a vaild report!")
        }
        break;
        
    }
})

client.login(process.env.twigSniff);


function write(type) {
    if(type === 1) {
        fs.writeFileSync('./Data/userData.json', JSON.stringify(userData))
    } else {

    }
}

/*
git add . && git commit -m "Title"
git push origin master
git push heroku master
*/