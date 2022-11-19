const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("afk")
		.setDescription("Set your status to Afk")
        .addStringOption(option =>
            option.setName("message").setDescription("the message you want other user know.").setRequired(false)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand, afk) {
        if (typeofcommand === "message") {
            let reason = argument.join(" ");
            afk.set(message.author.id, {
                TimeStamp: Date.now(),
                Reason: reason,
                Guild: message.guild,
                Author: message.author.username
            })
            message.guild.members.cache.find(user => message.author.id === user.author.id).setNickname(`[AFK] ${message.author.username}`)

            if (reason) {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> <@${message.author.id}> You are now afk for \`${reason}\`.`).setColor(`Green`)] })
            } else {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> <@${message.author.id}> You are now afk.`).setColor(`Green`)] })
            }
        } else if (typeofcommand === "interaction"){
            let reason = message.options.getString("message")
            afk.set(message.author.id, {
                TimeStamp: Date.now(),
                Reason: reason,
                Guild: message.guild,
                Author: message.user.username
            })
            message.guild.members.cache.find(user => message.user.id === user.id).setNickname(`[AFK] ${message.author.username}`)

            if (reason) {
                message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> <@${message.user.id}> You are now afk for \`${reason}\`.`).setColor(`Green`)] })
            } else {
                message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> <@${message.user.id}> You are now afk.`).setColor(`Green`)] })
            }
        }
    }
}