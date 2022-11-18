const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("stats")
		.setDescription("Show the server stat."),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`**Server Name**: ${message.guild.name}\nOwner: <@${message.guild.ownerId}>\nMembers: ${message.guild.memberCount}\nNSFW Level: ${message.guild.nsfwLevel}\nVerify: ${message.guild.verified}\nDiscord Partner: ${message.guild.partnered}`).setColor(`Blue`)] })
        } else if (typeofcommand === "interaction"){
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`**Server Name**: ${message.guild.name}\nOwner: <@${message.guild.ownerId}>\nMembers: ${message.guild.memberCount}\nNSFW Level: ${message.guild.nsfwLevel}\nVerify: ${message.guild.verified}\nDiscord Partner: ${message.guild.partnered}`).setColor(`Blue`)] })
        }
    }
}
