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
    async execute(argument, message, EmbedBuilder, client, typeofcommand, database_service) {
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