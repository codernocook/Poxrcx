const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("afk")
		.setDescription("Set your status to Afk"),
    execute(argument, message, EmbedBuilder, client, typeofcommand, afk) {
        if (typeofcommand === "message") {
            let reason = argument.slice(2).join(" ");
            afk.set(toString(message.author.id), [ Date.now(), reason ])
            message.author.setNickname(`[AFK] ${message.author.username}`)
            if (reason) {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> ${message.author}. You are now afk for ${reason}.`).setColor(`Green`)] })
            } else {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> ${message.author}. You are now afk.`).setColor(`Green`)] })
            }
        } else if (typeofcommand === "interaction"){
            let reason = argument.slice(2).join(" ");
            afk.set(toString(message.user.id), [ Date.now(), reason ])
            message.guild.members.cache.find(user => interaction.user.id).setNickname(`[AFK] ${interaction.user.username}`)

            if (reason) {
                message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> <@${message.user.id}>. You are now afk for ${reason}.`).setColor(`Green`)] })
            } else {
                message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> <@${message.user.id}>. You are now afk.`).setColor(`Green`)] })
            }
        }
    }
}
