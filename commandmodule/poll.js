const { SlashCommandBuilder } = require("@discordjs/builders")
const { Poll } = require("discord.js-poll")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("poll")
		.setDescription("Start a poll (max 26 choices)")
        .addStringOption(option =>
            option.setName("choices").setDescription("Title + Choice 1 + Choice 2 + etc to create a poll").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            if (!message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("ManageEvents") && !message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to start a poll.`).setColor(`Red`)] })
            let pollmessage = argument.slice(0).join(" ")
            if (!pollmessage) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You need a choices to start a poll.`).setColor(`Red`)] })
            Poll(pollmessage, argument, "+", "#00D1CD")
        } else if (typeofcommand === "interaction"){
            if (!message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("ManageEvents") && !message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("Administrator")) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to start a poll.`).setColor(`Red`)], ephemeral: true  })
            let pollmessage = message.options.getString("choices")
            let args = pollmessage.split().slice(0)
            if (!pollmessage) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You need a choices to start a poll.`).setColor(`Red`)] })
            Poll(pollmessage, args, "+", "#00D1CD")
        }
    }
}