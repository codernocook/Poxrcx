const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Show the help info!"),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Help page: https://poxrcx.vercel.app/docs/intro/\nSupport Server: https://poxrcx.vercel.app/invite/\nVersion: 3.5\nMade by Itzporium#9655!`).setColor(`Blue`)] })
        } else if (typeofcommand === "interaction"){
            message.editReply({ embeds: [new EmbedBuilder().setDescription(`Help page: https://poxrcx.vercel.app/docs/intro/\nSupport Server: https://poxrcx.vercel.app/invite/\nVersion: 3.5\nMade by Itzporium#9655!`).setColor(`Blue`)] })
        }
    }
}