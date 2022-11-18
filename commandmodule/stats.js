const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("stats")
		.setDescription("Show the server stat."),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`**Server Name**: ${toString(message.guild.name)}\nOwner: <@${toString(message.guild.ownerId)}>\nMembers: ${toString(message.guild.memberCount)}\nNSFW Level: ${toString(message.guild.nsfwLevel)}\nVerify: ${toString(message.guild.verified)}\nDiscord Partner: ${tostring(message.guild.partnered)}`).setColor(`Blue`)] })
        } else if (typeofcommand === "interaction"){
            message.reply({ embeds: [new EmbedBuilder().setDescription(`**Server Name**: ${toString(message.guild.name)}\nOwner: <@${toString(message.guild.ownerId)}>\nMembers: ${toString(message.guild.memberCount)}\nNSFW Level: ${toString(message.guild.nsfwLevel)}\nVerify: ${toString(message.guild.verified)}\nDiscord Partner: ${tostring(message.guild.partnered)}`).setColor(`Blue`)] })
        }
    }
}
