const {getMember, formatDate} = require('../../utils.js');
const {RichEmbed} = require('discord.js');
const {stripIndents} = require('common-tags');

module.exports = {
    name: "userinfo",
    category: "info",
    description: "Показывает инфрмацио о учаснике сервера",
    usage: "`userinfo [id]` | `userinfo [@участник]` | `userinfo [никнейм]`",
    run: async (bot, message, args) => {
        const member = getMember(message, args.join(" "));

        const joined = formatDate(member.joinedAt);
        const roles = member.roles
            .filter(r => r.id !== message.guild.id)
            .map(r => r)
            .join(", ") || "Нет ролей";
        const created = formatDate(member.user.createdAt);

        const embed = new RichEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)

            .addField("Информация участника", stripIndents`**> Имя пользователя:** ${member.displayName}
            **> Присоединился к серверу:** ${joined}
            **> Роли:** ${roles}`, true)

            .addField("Персональная информация пользователя", stripIndents`**> Айди:** ${member.user.id}
            **> Имя пользователя:** ${member.user.username}
            **> Тэг:** ${member.user.tag}
            **> Аккаунт создан:** ${created}`, true)

            .setTimestamp();

            if(member.user.presence.game)
                embed.addField("Играет в игру", `**> Название:** ${member.user.presence.game.name}`);

            message.channel.send(embed);
    }
} 