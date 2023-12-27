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
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
		.setName("timezone")
		.setDescription("View the timezone infomation.")
        .addStringOption(option =>
            option.setName("timezone").setDescription("The timezone name. Ex: Europe/London, ...").setRequired(false)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand, database_service) {
        if (typeofcommand === "message") {
            let timezonename = argument.join(" ").trim();
            if (!timezonename) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please type a valid timezone.`).setColor(`Red`)] });
            if (timezonename.trim() === "") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please type a valid timezone.`).setColor(`Red`)] });

            fetch(`https://www.timeapi.io/api/Time/current/zone?timeZone=${timezonename}`).then(res => res.json()).then(json => {
                try {
                    if (json) {
                        if (json["errors"]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please type a valid timezone.`).setColor(`Red`)] });
                        if (json === "Invalid Timezone") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please type a valid timezone.`).setColor(`Red`)] });
                        
                        let year = json["year"];
                        let month = json["month"];
                        let day = json["day"];
                        let hour = json["hour"];
                        let minute = json["minute"];
                        let second = json["seconds"];
                        let milli_seconds = json["milliSeconds"];
                        let dateTime = json["dateTime"];
                        let date = json["date"];
                        let time = json["time"];
                        let timezone = json["timeZone"];
                        let dayOfWeek = json["dayOfWeek"];
                        
                        message.channel.send({ embeds: [new EmbedBuilder().setDescription(`**Year:** ${year}\n**Month:** ${month}\n**Day:** ${day}\n**Hour:** ${hour}\n**Minute:** ${minute}\n**Second:** ${second}\n**MilliSeconds:** ${milli_seconds}\n**Date:** ${date}\n**System time:** ${dateTime}\n**Time:** ${time}\n**Day of week:** ${dayOfWeek}\n**Timezone:** ${timezone}`).setColor(`Blue`)] })
                    }
                } catch {
                    message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Something went wrong with this command, please try again later.`).setColor(`Red`)] });
                };
            })
        } else if (typeofcommand === "interaction"){
            let timezonename = message.options.getString("timezone");
            if (!timezonename) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please type a valid timezone.`).setColor(`Red`)] });
            if (timezonename.trim() === "") return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please type a valid timezone.`).setColor(`Red`)] });
            timezonename = message.options.getString("timezone").trim();

            fetch(`https://www.timeapi.io/api/Time/current/zone?timeZone=${timezonename}`).then(res => res.json()).then(json => {
                try {
                    if (json) {
                        if (json["errors"]) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please type a valid timezone.`).setColor(`Red`)] });
                        if (json === "Invalid Timezone") return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please type a valid timezone.`).setColor(`Red`)] });

                        let year = json["year"];
                        let month = json["month"];
                        let day = json["day"];
                        let hour = json["hour"];
                        let minute = json["minute"];
                        let second = json["seconds"];
                        let milli_seconds = json["milliSeconds"];
                        let dateTime = json["dateTime"];
                        let date = json["date"];
                        let time = json["time"];
                        let timezone = json["timeZone"];
                        let dayOfWeek = json["dayOfWeek"];
                        
                        message.editReply({ embeds: [new EmbedBuilder().setDescription(`**Year:** ${year}\n**Month:** ${month}\n**Day:** ${day}\n**Hour:** ${hour}\n**Minute:** ${minute}\n**Second:** ${second}\n**MilliSeconds:** ${milli_seconds}\n**Date:** ${date}\n**System time:** ${dateTime}\n**Time:** ${time}\n**Day of week:** ${dayOfWeek}\n**Timezone:** ${timezone}`).setColor(`Blue`)] })
                    }
                } catch {
                    message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Something went wrong with this command, please try again later.`).setColor(`Red`)] });
                };
            })
        }
    }
}