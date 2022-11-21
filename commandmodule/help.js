const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Show the help info!"),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Help page: https://poxrcx.vercel.app/help/\nSupport Server: https://poxrcx.vercel.app/invite/\nVersion: 3.0\nMade by Itzporium!`).setColor(`Blue`)] })
        } else if (typeofcommand === "interaction"){
            message.reply({ embeds: [new EmbedBuilder().setDescription(`Help page: https://poxrcx.vercel.app/help/\nSupport Server: https://poxrcx.vercel.app/invite/\nVersion: 3.0\nMade by Itzporium!`).setColor(`Blue`)] })
        }
    }
}