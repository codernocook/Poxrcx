/*
    Poxrcx
    Copyright (C) 2023  codernocook

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const { SlashCommandBuilder } = require("@discordjs/builders")
const TicTacToe = require("discord-tictactoe")
const game = new TicTacToe({ language: "en" })

module.exports = {
    data: new SlashCommandBuilder()
		.setName("ttt")
		.setDescription("Play tic-tac-toe."),
    execute(argument, message, EmbedBuilder, client, typeofcommand, database_service) {
        if (typeofcommand === "message") {
            game.handleMessage(message)
        } else if (typeofcommand === "interaction"){
            game.handleInteraction(message)
        }
    }
}