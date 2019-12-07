const {Client, RichEmbed, Collection} = require("discord.js");
const {config} = require("dotenv");

const bot = new Client({
    disableEveryone: true
});

bot.commands = new Collection();
bot.aliases = new Collection();

config({
    path: __dirname + "/.env"
});

["commandhandler"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});

bot.on("ready", () => {
    console.log(`${bot.user.username} online!`);

    bot.user.setPresence({
        status: process.env.STATUS,
        game: {
            name: process.env.ACTIVITYMESSAGE,
            type: process.env.ACTIVITYTYPE
        }
    });
});

bot.on("message", async message => {
    const prefix = process.env.PREFIX;

    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);

    // say hi test
    // cmd = say
    // args = [hi, test]
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd.length === 0) return;

    let command = bot.commands.get(cmd);
    if(!command) bot.commands.get(bot.aliases.get(cmd));
    if(command){
        command.run(bot, message, args);
    }
});

bot.login(process.env.TOKEN);

/*
module.exports = {
    name: " ",
    category: " ",
    description: " ",
    usage: " ",
    run: async (client, message, args) => {
        
    }
} 
*/