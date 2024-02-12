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
const googleIt = require("google-it")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("google")
		.setDescription("Search something on google")
        .addStringOption(option =>
            option.setName("search").setDescription("The keyword you want to search").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand, database_service) {
        if (typeofcommand === "message") {
            let searchquery = argument.join(" ")
            if (!searchquery) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You need a keyword to search on google.`).setColor(`Red`)] })
            if (searchquery && searchquery.trim() === "") {
                return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You need a keyword to search on google.`).setColor(`Red`)] })
            }
            googleIt({'query': searchquery, 'no-display': true, 'limit': 15}).then(async (results) => {
                const searcharray = results.slice(0, 11).map((item, i) => {
                    return `${i}: **[${item.title}](${item.link})**`
                }).join("\n")

                message.channel.send({ embeds: [new EmbedBuilder().setTitle("Google Search Results:").setDescription(`**Keyword**: \`${searchquery}\`\n\n${searcharray}`).setColor(`Blue`)]});
            }).catch(err => {
                // any possible errors that might have occurred (like no Internet connection)
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Something went wrong, maybe connection issue. Try again!`).setColor(`Red`)] })
            });
        } else if (typeofcommand === "interaction"){
            let searchquery = message.options.getString("search")
            if (!searchquery) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You need a keyword to search on google.`).setColor(`Red`)] })
            if (searchquery && searchquery.trim() === "") {
                return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You need a keyword to search on google.`).setColor(`Red`)] })
            }
            googleIt({'query': searchquery, 'no-display': true, 'limit': 15}).then(async (results) => {
                const searcharray = results.slice(0, 11).map((item, i) => {
                    return `${i}: **[${item.title}](${item.link})**`
                }).join("\n")

                await message.editReply({ embeds: [new EmbedBuilder().setTitle("Google Search Results:").setDescription(`**Keyword**: \`${searchquery}\`\n\n${searcharray}`).setColor(`Blue`)]});
            }).catch(err => {
                // any possible errors that might have occurred (like no Internet connection)
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Something went wrong, maybe connection issue. Try again!`).setColor(`Red`)] })
            });
        }
    }
}
