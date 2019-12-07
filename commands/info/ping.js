module.exports = {
    name: "ping",
    category: "info",
    description: "Показывает пинг пользователя и бота",
    usage: "`ping`",
    run: async (bot, message, args) => {
        const msg = await message.channel.send(`Пингую...`);
        msg.edit(`Пинг: ${Math.floor(msg.createdAt - message.createdAt)}мс\nПинг API: ${Math.round(bot.ping)}мс`);
    }
}