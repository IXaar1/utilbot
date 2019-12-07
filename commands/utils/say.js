module.exports = {
    name: "say",
    category: "utils",
    description: "Бот говорит за вас",
    usage: "`say [текст]` для обычного текста\n`say embed [текст]` для текста в рамке",
    run: async (client, message, args) => {
        if(message.deletable) return message.delete();
        if(args < 1) return message.reply(`нечего сказать?! :)`).then(m => m.delete(5000));

        
        if(args[0].toLowerCase() === "embed") {
            const embed = new RichEmbed()
            .setColor("#ffffff")
            .setDescription(args.slice(1).join(" "));
            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
        }
    }
}