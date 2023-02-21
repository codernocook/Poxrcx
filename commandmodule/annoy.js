const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("annoy")
		.setDescription("Annoy the bot."),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            message.channel.send(`AHHH STOP ANNOYING ME\neveryone THIS GUY KEEP ${message.author} ANNOYING ME!`)
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`${message.author} got banned forever.`).setColor(`Green`)] })
        } else if (typeofcommand === "interaction"){
            message.reply({ embeds: [new EmbedBuilder().setDescription(`YOU KNOW WHAT? ...`).setColor(`Red`)], ephemeral: true });
            message.channel.send(`AHHH STOP ANNOYING ME\neveryone THIS GUY KEEP ${message.author} ANNOYING ME!`)
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`${message.author} got banned forever.`).setColor(`Green`)] })
        }
    }
}