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
		.setName("whois")
		.setDescription("Get user infomation.")
        .addUserOption(option =>
            option.setName("user").setDescription("The user to get infomation.").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand, database_service) {
        if (typeofcommand === "message") {
            if (!argument[0]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid User!`).setColor(`Red`)] })
            const mentioneduser = message.mentions.members.first();
            if (!mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid User!`).setColor(`Red`)] })
            const roles = mentioneduser.roles.cache;

            message.channel.send({ embeds: [new EmbedBuilder().setTitle(`${mentioneduser.user.tag}`).setThumbnail(`${mentioneduser.displayAvatarURL()}`).setDescription(`**Registered**: ${mentioneduser.joinedAt}\n**Joined**: ${mentioneduser.user.createdAt}\n**Id**: ${mentioneduser.id}\n**Role (${roles.map(r => r).length})**: ${roles.map(r => r).join(" ")}\n**Permission Level**: ${mentioneduser.roles.highest.position}`).setColor(`Blue`)] })
        } else if (typeofcommand === "interaction"){
            const mentioneduser = message.guild.members.cache.find(user => message.options.getUser("user").id === user.id);
            if (!mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid User!`).setColor(`Red`)] })
            const roles = mentioneduser.roles.cache;

            message.editReply({ embeds: [new EmbedBuilder().setTitle(`${mentioneduser.user.tag}`).setThumbnail(`${mentioneduser.displayAvatarURL()}`).setDescription(`**Registered**: ${mentioneduser.joinedAt}\n**Joined**: ${mentioneduser.user.createdAt}\n**Id**: ${mentioneduser.id}\n**Role (${roles.map(r => r).length})**: ${roles.map(r => r).join(" ")}\n**Permission Level**: ${mentioneduser.roles.highest.position}`).setColor(`Blue`)] })
        }
    }
}