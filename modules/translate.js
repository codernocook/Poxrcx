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
const translate = require("@iamtraction/google-translate")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("translate")
		.setDescription("Translate a language")
        .addStringOption(option =>
            option.setName("from").setDescription("The main language").setRequired(true)
        )
        .addStringOption(option =>
            option.setName("to").setDescription("The language you want to translate to").setRequired(true)
        )
        .addStringOption(option =>
            option.setName("words").setDescription("The word you want to translate").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand, database_service) {
        if (typeofcommand === "message") {
            const fromlanguage = argument[0].toLowerCase();
            const tolanguage = argument[1].toLowerCase();
            const words = argument.slice(2).join(" ");

            translate(words, {from: fromlanguage, to: tolanguage}).then(async (res) => {
                await message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Translate (${fromlanguage}): ${words}\nTo (${tolanguage}): ${res.text}`).setColor(`Blue`)] })
            }).catch(err => {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> An error has occured`).setColor(`Red`)] })
            })
        } else if (typeofcommand === "interaction"){
            const fromlanguage = message.options.getString("from").toLowerCase();
            const tolanguage = message.options.getString("to").toLowerCase();
            const words = message.options.getString("words");

            translate(words, {from: fromlanguage, to: tolanguage}).then(async (res) => {
                await message.editReply({ embeds: [new EmbedBuilder().setDescription(`Translate (${fromlanguage}): ${words}\nTo (${tolanguage}): ${res.text}`).setColor(`Blue`)] })
            }).catch(err => {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> An error has occured`).setColor(`Red`)] })
            })
        }
    }
}
