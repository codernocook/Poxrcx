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
const coinfliping = ['heads','tails']

module.exports = {
    data: new SlashCommandBuilder()
        .setName("flip")
		.setDescription("Flip a coin."),
    execute(argument, message, EmbedBuilder, client, typeofcommand, database_service) {
        if (typeofcommand === "message") {
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> <@${message.author.id}> ${coinfliping[Math.floor(Math.random()*coinfliping.length)]}`).setColor(`Green`)] })
        } else if (typeofcommand === "interaction"){
            message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> <@${message.user.id}> ${coinfliping[Math.floor(Math.random()*coinfliping.length)]}`).setColor(`Green`)] })
        }
    }
}