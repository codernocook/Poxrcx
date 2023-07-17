const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Pong!"),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Pong! **${client.ws.ping}ms**`).setColor(`Green`)] })
        } else if (typeofcommand === "interaction"){
            message.editReply({ embeds: [new EmbedBuilder().setDescription(`Pong! **${client.ws.ping}ms**`).setColor(`Green`)] })
        }
    }
}
