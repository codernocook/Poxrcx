const { SlashCommandBuilder } = require("@discordjs/builders")
const coinfliping = ['heads','tails']

module.exports = {
    data: new SlashCommandBuilder()
        .setName("flip")
		.setDescription("Flip a coin."),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> <@${message.author.id}> ${coinfliping[Math.floor(Math.random()*coinfliping.length)]}`).setColor(`Green`)] })
        } else if (typeofcommand === "interaction"){
            message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> <@${message.user.id}> ${coinfliping[Math.floor(Math.random()*coinfliping.length)]}`).setColor(`Green`)] })
        }
    }
}