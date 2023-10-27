const { SlashCommandBuilder } = require("@discordjs/builders");
const guessingchar = ['Rich', 'Poor', 'Quiet', 'Chad']

async function guessinggame(reqsent, botsent) {
    const req = reqsent.toLowerCase();
    const bot = botsent.toLowerCase();

    // Win
    if (req === bot) return "You win!"

    // Lose
    if (!(req === bot)) return "You lose!"
}

module.exports = {
    data: new SlashCommandBuilder()
		.setName("guessing")
		.setDescription("Guess the bot's answer")
        .addStringOption(option =>
            option.setName("choice").setDescription("Your choice: [Rich], [Poor], [Quiet], [Chad]").setRequired(true)
        ),
    async execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            const botguessinganswer = await guessingchar[Math.floor(Math.random()*guessingchar.length)]
            const botguessingrandom = await guessinggame(argument.join(" ").trim(), botguessinganswer)
            const reqchoice = argument.join(" ").trim().charAt(0).toUpperCase() + argument.join(" ").trim().slice(1)

            if (botguessingrandom === "You win!") {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`You choose: **${reqchoice}**.\nI choose: **${botguessinganswer}**.\n\n**${botguessingrandom}**`).setColor(`Green`)] })
            } else if (botguessingrandom === "You lose!") {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`You choose: **${reqchoice}**.\nI choose: **${botguessinganswer}**.\n\n**${botguessingrandom}**`).setColor(`Red`)] })
            }
        } else if (typeofcommand === "interaction"){
            const botguessinganswer = await guessingchar[Math.floor(Math.random()*guessingchar.length)]
            const botguessingrandom = await guessinggame(message.options.getString("choice").trim(), botguessinganswer)
            const reqchoice = message.options.getString("choice").trim().charAt(0).toUpperCase() + message.options.getString("choice").trim().slice(1)

            if (botguessingrandom === "You win!") {
                message.editReply({ embeds: [new EmbedBuilder().setDescription(`You choose: **${reqchoice}**.\nI choose: **${botguessinganswer}**.\n\n**${botguessingrandom}**`).setColor(`Green`)] })
            } else if (botguessingrandom === "You lose!") {
                message.editReply({ embeds: [new EmbedBuilder().setDescription(`You choose: **${reqchoice}**.\nI choose: **${botguessinganswer}**.\n\n**${botguessingrandom}**`).setColor(`Red`)] })
            }
        }
    }
}