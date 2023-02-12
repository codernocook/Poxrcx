const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("whois")
		.setDescription("Get user infomation.")
        .addUserOption(option =>
            option.setName("user").setDescription("The user to get infomation.").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            if (!argument[0]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid User!`).setColor(`Red`)] })
            const mentioneduser = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0]);
            if (!mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid User!`).setColor(`Red`)] })
            const roles = mentioneduser.roles.cache;

            message.channel.send({ embeds: [new EmbedBuilder().setTitle(`${mentioneduser.user.tag}`).setThumbnail(`${mentioneduser.displayAvatarURL()}`).setDescription(`**Registered**: ${mentioneduser.joinedAt}\n**Joined**: ${mentioneduser.user.createdAt}\n**Id**: ${mentioneduser.id}\n**Role (${roles.map(r => r).length})**: ${roles.map(r => r).join(" ")}\n**Permission Level**: ${mentioneduser.roles.highest.position}`).setColor(`Blue`)] })
        } else if (typeofcommand === "interaction"){
            const mentioneduser = message.guild.members.cache.find(user => message.options.getUser("user").id === user.id);
            if (!mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid User!`).setColor(`Red`)] })
            const roles = mentioneduser.roles.cache;

            message.reply({ embeds: [new EmbedBuilder().setTitle(`${mentioneduser.user.tag}`).setThumbnail(`${mentioneduser.displayAvatarURL()}`).setDescription(`**Registered**: ${mentioneduser.joinedAt}\n**Joined**: ${mentioneduser.user.createdAt}\n**Id**: ${mentioneduser.id}\n**Role (${roles.map(r => r).length})**: ${roles.map(r => r).join(" ")}\n**Permission Level**: ${mentioneduser.roles.highest.position}`).setColor(`Blue`)] })
        }
    }
}