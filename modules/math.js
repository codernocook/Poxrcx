/*
    Poxrcx
    Copyright (C) 2024 codernocook

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
const math = require("mathjs")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("math")
		.setDescription("calculate a math")
        .addStringOption(option =>
            option.setName("calculate").setDescription("The math you want to calculate").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand, database_service) {
        if (typeofcommand === "message") {
            const mathquestion = argument.slice(0).join(" ")
            if (!mathquestion) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please provide a valid equation.`).setColor(`Red`)] })
            if (mathquestion.trim() === "") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please provide a valid equation.`).setColor(`Red`)] })
            
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`${mathquestion} = ${math.evaluate(mathquestion)}`).setColor(`Blue`)] }).catch(err => {message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please provide a valid equation.`).setColor(`Red`)] })})
        } else if (typeofcommand === "interaction"){
            const mathquestion = message.options.getString("calculate")
            if (!mathquestion) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please provide a valid equation.`).setColor(`Red`)] })
            if (mathquestion.trim() === "") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please provide a valid equation.`).setColor(`Red`)] })
            
            message.editReply({ embeds: [new EmbedBuilder().setDescription(`${mathquestion} = ${math.evaluate(mathquestion)}`).setColor(`Blue`)] }).catch(err => {message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please provide a valid equation.`).setColor(`Red`)] })})
        }
    }
}