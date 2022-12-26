const { SlashCommandBuilder } = require("@discordjs/builders")
const rpschar = ['Rock', 'Paper', 'Scissor']

function rpsgame(reqsent, botsent) {
    const req = reqsent.toLowerCase();
    const bot = botsent.toLowerCase();
    //check if req and bot is not missing
    if (!req || !bot) return
    // if the req and bot is match then we gonna return (match)
    if (req === bot) return "Match!"

    // Win
    if ((req === "rock" && bot === "scissors") || (req === "paper" && bot === "rock" || (req === "scissor" && bot === "paper"))) {
        return "You win!"
    }
    //Lose
    if ((req === "rock" && bot === "paper") || (req === "paper" && bot === "scissors") || (req === "scissor" && bot === "rock")) {
        return "You lose!"
    }
}

module.exports = {
    data: new SlashCommandBuilder()
		.setName("rps")
		.setDescription("Play rock, paper, scissior.")
        .addStringOption(option =>
            option.setName("choice").setDescription("Your choice: Rock, Paper, Scissor.").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            const botrpsanswer = rpschar[Math.floor(Math.random()*rpschar.length)]
            const botrpsrandom = rpsgame(argument.join(" ").trim(), botrpsanswer)
            const reqchoice = argument.join(" ").trim().charAt(0).toUpperCase() + argument.join(" ").trim().slice(1)

            //return if the user send wrong message
            if (!argument.join(" ").trim().toLowerCase() === "rock" || !argument.join(" ").trim().toLowerCase() === "paper" || !argument.join(" ").trim().toLowerCase() === "scissor") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Your choice must be Rock, Paper or Scissor.`).setColor(`Red`)] })

            if (botrpsrandom === "You win!") {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`You choose: **${reqchoice}**.\nI choose: **${botrpsanswer}**.\n\n**${botrpsrandom}**`).setColor(`Green`)] })
            } else if (botrpsrandom === "You lose!") {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`You choose: **${reqchoice}**.\nI choose: **${botrpsanswer}**.\n\n**${botrpsrandom}**`).setColor(`Red`)] })
            } else if (botrpsrandom === "Match!") {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`You choose: **${reqchoice}**.\nI choose: **${botrpsanswer}**.\n\n**${botrpsrandom}**`).setColor(`Blue`)] })
            }
        } else if (typeofcommand === "interaction"){
            const botrpsanswer = rpschar[Math.floor(Math.random()*rpschar.length)]
            const botrpsrandom = rpsgame(message.options.getString("choice").trim(), botrpsanswer)
            const reqchoice = message.options.getString("choice").trim().charAt(0).toUpperCase() + message.options.getString("choice").trim().slice(1)

            //return if the user send wrong message
            if (!message.options.getString("choice").trim().toLowerCase() === "rock" || !message.options.getString("choice").trim().toLowerCase() === "paper" || !message.options.getString("choice").trim().toLowerCase() === "scissor") return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Your choice must be Rock, Paper or Scissor.`).setColor(`Red`)] })

            if (botrpsrandom === "You win!") {
                message.reply({ embeds: [new EmbedBuilder().setDescription(`You choose: **${reqchoice}**.\nI choose: **${botrpsanswer}**.\n\n**${botrpsrandom}**`).setColor(`Green`)] })
            } else if (botrpsrandom === "You lose!") {
                message.reply({ embeds: [new EmbedBuilder().setDescription(`You choose: **${reqchoice}**.\nI choose: **${botrpsanswer}**.\n\n**${botrpsrandom}**`).setColor(`Red`)] })
            } else if (botrpsrandom === "Match!") {
                message.reply({ embeds: [new EmbedBuilder().setDescription(`You choose: **${reqchoice}**.\nI choose: **${botrpsanswer}**.\n\n**${botrpsrandom}**`).setColor(`Blue`)] })
            }
        }
    }
}