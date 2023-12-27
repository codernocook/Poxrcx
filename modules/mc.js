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
		.setName("mc")
		.setDescription("Get a minecraft player/server info.")
        .addSubcommand(subcommand =>
			subcommand
				.setName("player")
				.setDescription("Get minecraft player info.")
				.addStringOption(option =>
					option.setName("user").setDescription("The Player username/uuid").setRequired(true)
				),
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("server")
				.setDescription("Get minecraft server info.")
				.addStringOption(option =>
					option.setName("address").setDescription("The minecraft server ip address.").setRequired(true)
				),
		),
    execute(argument, message, EmbedBuilder, client, typeofcommand, database_service) {
        if (typeofcommand === "message") {
            if (!argument[1]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Missing type of subcommand`).setColor(`Red`)] })
            const subcommand = argument[0];
            if (subcommand === "player") {
                const player = argument.slice(1).join(" ").trim();
                fetch("https://api.mojang.com/profiles/minecraft", { method: "POST", body: JSON.stringify([player]), headers: { 'Content-Type': 'application/json' }}).then(res => res.json()).then(json => {
                    if (json["error"]) {
                        return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You sent an invalid minecraft player or an error has occured.`).setColor(`Red`)] })
                    }
                    try {
                        const name = json[0]["name"]
                        const id = json[0]["id"]
                        message.channel.send({ embeds: [new EmbedBuilder().setThumbnail(`https://mineskin.eu/helm/${player}/100`).setDescription(`Username: **${name}**\nId: \`${id}\``).setColor(`Blue`)] })
                    } catch (err) {
                        message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You sent an invalid minecraft player or an error has occured.`).setColor(`Red`)] })
                    }
                })
            } else if (subcommand === "server") {
                const server = argument.slice(1).join(" ").trim();
                try {
                    fetch(`https://api.mcsrvstat.us/2/${server}`).then(res => res.json()).then(json => {
                        if (json["ip"] === "127.0.0.1" && json["debug"]["ping"] === false) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You sent an invalid server ip address or the server is offline.`).setColor(`Red`)] })
                        const serverip = json["ip"]
                        const port = json["port"]
                        const onlinemode = json["online"]
                        const playermodule = json["players"]
                        const onlineplayers = playermodule["online"]
                        const maxplayer = playermodule["max"]
                        const hostname = json["hostname"]
                        //const icon = new Image();
                        //icon.src = json["icon"];

                        try {
                            if (hostname) {
                                message.channel.send({ embeds: [new EmbedBuilder().setThumbnail(`https://eu.mc-api.net/v3/server/favicon/${hostname}`).setDescription(`Ip Address: ${serverip}\nPort: ${port}\nHostname: ${hostname}\nOnline Mode: ${onlinemode}\nPlaying: ${onlineplayers}\nMax Player: ${maxplayer}\nStats: ${onlineplayers}/${maxplayer}`).setColor(`Blue`)] })
                            } else if (!hostname) {
                                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Ip Address: ${serverip}\nPort: ${port}\nHostname: None\nOnline Mode: ${onlinemode}\nPlaying: ${onlineplayers}\nMax Player: ${maxplayer}\nStats: ${onlineplayers}/${maxplayer}`).setColor(`Blue`)] })
                            }
                        } catch {
                            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You sent an invalid server ip address or the server is offline.`).setColor(`Red`)] })
                        }
                    })
                } catch {
                    message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You sent an invalid server ip address or the server is offline.`).setColor(`Red`)] })
                }
            }
        } else if (typeofcommand === "interaction"){
            if (message.options.getSubcommand() === "player") {
                const player = message.options.getString("user");
                fetch("https://api.mojang.com/profiles/minecraft", { method: "POST", body: JSON.stringify([player]), headers: { 'Content-Type': 'application/json' }}).then(res => res.json()).then(json => {
                    if (json["error"]) {
                        return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You sent an invalid minecraft player or an error has occured.`).setColor(`Red`)] })
                    }
                    try {
                        const name = json[0]["name"]
                        const id = json[0]["id"]
                        message.editReply({ embeds: [new EmbedBuilder().setThumbnail(`https://mineskin.eu/helm/${player}/100`).setDescription(`Username: **${name}**\nId: \`${id}\``).setColor(`Blue`)] })
                    } catch (err) {
                        message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You sent an invalid minecraft player or an error has occured.`).setColor(`Red`)] })
                    }
                })
            } else if (message.options.getSubcommand() === "server") {
                const server = message.options.getString("address");
                try {
                    fetch(`https://api.mcsrvstat.us/2/${server}`).then(res => res.json()).then(json => {
                        if (json["ip"] === "127.0.0.1" && json["debug"]["ping"] === false) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You sent an invalid server ip address.`).setColor(`Red`)] })
                        const serverip = json["ip"]
                        const port = json["port"]
                        const onlinemode = json["online"]
                        const playermodule = json["players"]
                        const onlineplayers = playermodule["online"]
                        const maxplayer = playermodule["max"]
                        const hostname = json["hostname"]
                        //const icon = new Image();
                        //icon.src = json["icon"];

                        try {
                            if (hostname) {
                                message.editReply({ embeds: [new EmbedBuilder().setThumbnail(`https://eu.mc-api.net/v3/server/favicon/${hostname}`).setDescription(`Ip Address: ${serverip}\nPort: ${port}\nHostname: ${hostname}\nOnline Mode: ${onlinemode}\nPlaying: ${onlineplayers}\nMax Player: ${maxplayer}\nStats: ${onlineplayers}/${maxplayer}`).setColor(`Blue`)] })
                            } else if (!hostname) {
                                message.editReply({ embeds: [new EmbedBuilder().setDescription(`Ip Address: ${serverip}\nPort: ${port}\nHostname: None\nOnline Mode: ${onlinemode}\nPlaying: ${onlineplayers}\nMax Player: ${maxplayer}\nStats: ${onlineplayers}/${maxplayer}`).setColor(`Blue`)] })
                            }
                        } catch {
                            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You sent an invalid server ip address or the server is offline.`).setColor(`Red`)] })
                        }
                    })
                } catch {
                    message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You sent an invalid server ip address or the server is offline.`).setColor(`Red`)] })
                }
            }
        }
    }
}