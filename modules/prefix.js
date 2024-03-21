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

module.exports = {
    data: new SlashCommandBuilder()
		.setName("prefix")
		.setDescription("Change discord bot prefix.")
        .addStringOption(option =>
            option.setName("prefix").setDescription("The prefix you want to set to.").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand, database_service) {
        if (typeofcommand === "message") {
            let prefixtype = argument.join(" ").trim();
            
            if (!message.member.permissions.has("ManageGuild") && !message.member.permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to change the guild prefix.`).setColor(`Red`)] });

            if (!prefixtype) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please type a valid prefix you want to set.`).setColor(`Red`)] });
            if (prefixtype.trim() === "") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please type a valid prefix you want to set.`).setColor(`Red`)] });
            
            if (prefixtype) {
                if (prefixtype.trim() === process.env.prefix) {
                    message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Changed the prefix to \`${prefixtype.trim()}\``).setColor(`Green`)] });
                    database_service["prefix"].has(`${message.guildId}`, function(callback) {
                        if (callback === true) {
                            database_service["prefix"].remove(`${message.guildId}`, function(prefixdel) {});
                        }
                    })
                    return;
                }
                database_service["prefix"].add(`${message.guildId}`, {
                    "timestamp": Date.now(),
                    "prefix": prefixtype.trim(),
                    "serverinfo": message.guild,
                    "changedby": message.author
                }, function(callback) {});
            }
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Changed the prefix to \`${prefixtype.trim()}\``).setColor(`Green`)] });
        } else if (typeofcommand === "interaction"){
            let prefixtype = message.options.getString("prefix");

            if (!message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("ManageGuild") && !message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("Administrator")) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to change the guild prefix.`).setColor(`Red`)] });

            if (!prefixtype) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please type a valid prefix you want to set.`).setColor(`Red`)] });
            if (prefixtype.trim() === "") return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please type a valid prefix you want to set.`).setColor(`Red`)] });
            
            if (prefixtype) {
                if (prefixtype.trim() === process.env.prefix) {
                    message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Changed the prefix to \`${prefixtype.trim()}\``).setColor(`Green`)] });
                    database_service["prefix"].has(`${message.guildId}`, function(callback) {
                        if (callback === true) {
                            database_service["prefix"].remove(`${message.guildId}`, function(prefixdel) {});
                        }
                    })
                    return;
                }
                database_service["prefix"].add(`${message.guildId}`, {
                    "timestamp": Date.now(),
                    "prefix": prefixtype.trim(),
                    "serverinfo": message.guild,
                    "changedby": message.user
                }, function(callback) {});
            }
            message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Changed the prefix to \`${prefixtype.trim()}\``).setColor(`Green`)] });
        }
    }
}