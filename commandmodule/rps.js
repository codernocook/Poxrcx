const { SlashCommandBuilder } = require("@discordjs/builders");
const rpschar = ['Rock', 'Paper', 'Scissor']

module.exports = {
    data: new SlashCommandBuilder()
		.setName("rps")
		.setDescription("Play rock, paper, scissiors.")
        .addStringOption(option =>
            option.setName("choice").setDescription("Your choice: Rock, Paper, Scissors.").setRequired(true)
        ),
    async execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            const botrpsanswer = await rpschar[Math.floor(Math.random()*rpschar.length)];
            const req = argument.join(" ").trim().toLowerCase();
            let bot = botrpsanswer;
            const reqchoice = argument.join(" ").trim().charAt(0).toUpperCase() + argument.join(" ").trim().slice(1)
            let botrpsrandom = undefined;

            if (req === bot) botrpsrandom = "Tie!"

            // Win
            if ((req === "rock" && bot?.toString().toLowerCase() === "scissors") || (req === "paper" && bot?.toString().toLowerCase() === "rock" || (req === "scissor" && bot?.toString().toLowerCase() === "paper"))) {
                botrpsrandom = "You win!"
            }
            //Lose
            if ((req === "rock" && bot?.toString().toLowerCase() === "paper") || (req === "paper" && bot?.toString().toLowerCase() === "scissors") || (req === "scissor" && bot?.toString().toLowerCase() === "rock")) {
                botrpsrandom = "You lose"
            }

            if (botrpsrandom === "You win!") {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`You choose: **${reqchoice}**.\nI choose: **${botrpsanswer}**.\n\n**${botrpsrandom}**`).setColor(`Green`)] })
            } else if (botrpsrandom === "You lose!") {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`You choose: **${reqchoice}**.\nI choose: **${botrpsanswer}**.\n\n**${botrpsrandom}**`).setColor(`Red`)] })
            } else if (botrpsrandom === "Tie!") {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`You choose: **${reqchoice}**.\nI choose: **${botrpsanswer}**.\n\n**${botrpsrandom}**`).setColor(`Blue`)] })
            }
        } else if (typeofcommand === "interaction"){
            const botrpsanswer = await rpschar[Math.floor(Math.random()*rpschar.length)];
            const req = message.options.getString("choice").trim();
            let bot = botrpsanswer
            const reqchoice = message.options.getString("choice").trim().charAt(0).toUpperCase() + message.options.getString("choice").trim().slice(1)
            let botrpsrandom = undefined;

            if (req === bot) botrpsrandom = "Tie!"

            // Win
            if ((req === "rock" && bot?.toString().toLowerCase() === "scissors") || (req === "paper" && bot?.toString().toLowerCase() === "rock" || (req === "scissor" && bot?.toString().toLowerCase() === "paper"))) {
                botrpsrandom = "You win!"
            }
            //Lose
            if ((req === "rock" && bot?.toString().toLowerCase() === "paper") || (req === "paper" && bot?.toString().toLowerCase() === "scissors") || (req === "scissor" && bot?.toString().toLowerCase() === "rock")) {
                botrpsrandom = "You lose"
            }

            if (botrpsrandom === "You win!") {
                message.editReply({ embeds: [new EmbedBuilder().setDescription(`You choose: **${reqchoice}**.\nI choose: **${botrpsanswer}**.\n\n**${botrpsrandom}**`).setColor(`Green`)] })
            } else if (botrpsrandom === "You lose!") {
                message.editReply({ embeds: [new EmbedBuilder().setDescription(`You choose: **${reqchoice}**.\nI choose: **${botrpsanswer}**.\n\n**${botrpsrandom}**`).setColor(`Red`)] })
            } else if (botrpsrandom === "Match!") {
                message.editReply({ embeds: [new EmbedBuilder().setDescription(`You choose: **${reqchoice}**.\nI choose: **${botrpsanswer}**.\n\n**${botrpsrandom}**`).setColor(`Blue`)] })
            }
        }
    }
}