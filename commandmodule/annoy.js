const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("annoy")
		.setDescription("Annoy the bot."),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            message.channel.send("STOP ANNOYING BITCH")
            message.channel.send(`everyone THIS SHIT IS ${message.author} ANNOYING ME!`)
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`${message.author} got banned forever.`).setColor(`Green`)] })
        } else if (typeofcommand === "interaction"){
            message.channel.send("STOP ANNOYING BITCH")
            message.channel.send(`everyone THIS SHIT IS ${message.author} ANNOYING ME!`)
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`${message.author} got banned forever.`).setColor(`Green`)] })
        }
    }
}
