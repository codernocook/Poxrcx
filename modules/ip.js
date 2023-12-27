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
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
		.setName("ip")
		.setDescription("Show the ip address infomation.")
        .addStringOption(option =>
            option.setName("ip-address").setDescription("The ip address you want to get infomation.").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand, database_service) {
        if (typeofcommand === "message") {
            let ip = argument.join(" ");

            if (!ip) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You need an ip address to run this command.`).setColor(`Red`)] });
            if (ip.trim() === "") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You need an ip address to run this command.`).setColor(`Red`)] });

            fetch(`http://ip-api.com/json/${ip}`).then(res => res.json()).then(json => {
                fetch(`http://ip-api.com/json/`).then(res => res.json()).then(jsoncheck => {
                    if (json) {
                        try {
                            if (json["message"] && json["message"].toLowerCase().trim() === "invalidquery") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please type a valid ip address.`).setColor(`Red`)] });
                            if (json["status"] && json["status"] === "fail" && json["message"] && json["message"].toLowerCase().trim() !== "invalidquery") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Something went wrong with this command, please try again later.`).setColor(`Red`)] });
    
                            let country = json["country"] || "None";
                            let country_code = json["countryCode"] || "None";
                            let region = json["region"] || "None";
                            let region_name = json["regionName"] || "None";
                            let city = json["city"] || "None";
                            let zip = json["zip"] || "None";
                            let lat = json["lat"] || "None";
                            let lon = json["lon"] || "None";
                            let timezone = json["timezone"] || "None";
                            let isp = json["isp"] || "None";
                            let org = json["org"] || "None";
                            let query = json["query"] || "None";

                            if (jsoncheck["query"] && json["query"]) {
                                if (json["query"].trim() === jsoncheck["query"]) {
                                    return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You cannot view the discord bot ip address`).setColor(`Red`)] });
                                }
                            }
    
                            message.channel.send({ embeds: [new EmbedBuilder().setTitle(`Ip infomation of ${query}`).setDescription(`Country: ${country}\nCountry Code: ${country_code}\nRegion: ${region}\nRegion Name: ${region_name}\nCity: ${city}\nZip: ${zip}\nLat: ${lat}\nLon: ${lon}\nTimezone: ${timezone}\nIsp: ${isp}\nOrg: ${org}`).setColor(`Blue`)] });
                        } catch {
                            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Something went wrong with this command, please try again later.`).setColor(`Red`)] });
                        }
                    }
                })
            })
        } else if (typeofcommand === "interaction"){
            let ip = message.options.getString("ip-address");

            if (!ip) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You need an ip address to run this command.`).setColor(`Red`)] });
            if (ip.trim() === "") return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You need an ip address to run this command.`).setColor(`Red`)] });
            if (!ip) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You need a ip address to run this command.`).setColor(`Red`)] });
            if (ip.trim() === "") return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You need a ip address to run this command.`).setColor(`Red`)] });

            fetch(`http://ip-api.com/json/${ip}`).then(res => res.json()).then(json => {
                fetch(`http://ip-api.com/json/`).then(res => res.json()).then(jsoncheck => {
                    if (json) {
                        try {
                            if (json["message"] && json["message"].toLowerCase().trim() === "invalidquery") return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please type a valid ip address.`).setColor(`Red`)] });
                            if (json["status"] && json["status"] === "fail" && json["message"] && json["message"].toLowerCase().trim() !== "invalidquery") return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Something went wrong with this command, please try again later.`).setColor(`Red`)] });
                            if (json["message"] && json["message"].toLowerCase().trim() === "invalidquery") return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please type a valid ip address.`).setColor(`Red`)] });
                            if (json["status"] && json["status"] === "fail" && json["message"] && json["message"].toLowerCase().trim() !== "invalidquery") return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Some thing went wrong with this command, please try again later.`).setColor(`Red`)] });
    
                            let country = json["country"] || "None";
                            let country_code = json["countryCode"] || "None";
                            let region = json["region"] || "None";
                            let region_name = json["regionName"] || "None";
                            let city = json["city"] || "None";
                            let zip = json["zip"] || "None";
                            let lat = json["lat"] || "None";
                            let lon = json["lon"] || "None";
                            let timezone = json["timezone"] || "None";
                            let isp = json["isp"] || "None";
                            let org = json["org"] || "None";
                            let query = json["query"] || "None";

                            if (jsoncheck["query"] && json["query"]) {
                                if (json["query"].trim() === jsoncheck["query"]) {
                                    return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You cannot view the discord bot ip address`).setColor(`Red`)] });
                                }
                            }
    
                            message.editReply({ embeds: [new EmbedBuilder().setTitle(`Ip infomation of ${query}`).setDescription(`Country: ${country}\nCountry Code: ${country_code}\nRegion: ${region}\nRegion Name: ${region_name}\nCity: ${city}\nZip: ${zip}\nLat: ${lat}\nLon: ${lon}\nTimezone: ${timezone}\nIsp: ${isp}\nOrg: ${org}`).setColor(`Blue`)] });
                        } catch {
                            message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Something went wrong with this command, please try again later.`).setColor(`Red`)] });
                        }
                    }
                })
            })
        }
    }
}