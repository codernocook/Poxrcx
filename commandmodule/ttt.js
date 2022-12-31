const { SlashCommandBuilder } = require("@discordjs/builders")
const TicTacToe = require("discord-tictactoe")
const game = new TicTacToe({ language: "en" })

module.exports = {
    data: new SlashCommandBuilder()
		.setName("ttt")
		.setDescription("Play tic-tac-toe."),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            game.handleMessage(message)
        } else if (typeofcommand === "interaction"){
            game.handleInteraction(message)
        }
    }
}