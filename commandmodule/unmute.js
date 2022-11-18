const { default: parse } = require('parse-duration');
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("unmute")
		.setDescription("Unmute someone from the server!")
        .addMentionableOption(option =>
            option.setName("user").setDescription("User to unmute").setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason").setDescription("Reason why you unmute this user.").setRequired(false)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            const mentioneduser = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0])
            const parsetime = require('parse-duration').default;
            const mspack = require('ms');

            if (!mentioneduser) return message.channel.send("Invaild user.")
            if (message.member === mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't unmute yourself!`).setColor(`Red`)] })
            if (!message.member.permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to unmute this user!`).setColor(`Red`)] })

            const parsedtime = parsetime(argument[1])
            let reason = argument.slice(1).join(" ") || 'No reason given.'

            mentioneduser.timeout(parsedtime, reason).catch(err => {message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> I can't unmute user ${mentioneduser}`).setColor(`Red`)] })});
    
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> User ${mentioneduser} was unmuted.`).setColor(`Green`)] })
        } else if (typeofcommand === "interaction") {
            const mentioneduser = message.options.getMentionable("user")
            const parsetime = require('parse-duration').default;
            const mspack = require('ms');

            if (!mentioneduser) return message.reply("Invaild user.")
            if (message.guild.members.cache.find(user => message.user.id) === mentioneduser) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't unmute yourself!`).setColor(`Red`)] })
            if (!message.guild.members.cache.find(user => message.user.id).permissions.has("Administrator")) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to unmute this user!`).setColor(`Red`)] })

            let reason = message.options.getString("reason") || 'No reason given.'

            mentioneduser.timeout("0", reason).catch(err => {message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> I can't unmute user ${mentioneduser}`).setColor(`Red`)] })});
    
            message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> User ${mentioneduser} was unmuted.`).setColor(`Green`)] })
        }
    }
}
