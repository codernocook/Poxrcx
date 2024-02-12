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
		.setName("kill")
		.setDescription("Destroy someone you hate!")
        .addUserOption(option =>
            option.setName("user").setDescription("User to kill").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand, database_service) {
        if (typeofcommand === "message") {
            if (!argument[0]) message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid Target!`).setColor(`Red`)] })
            const mentioneduser = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0])
            if (!mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid Target!`).setColor(`Red`)] })
            if (message.member === mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Please I don't want you to die, you are the best murderer!`).setColor(`Red`)] })
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> You killed ${mentioneduser}!`).setColor(`Green`)] })
        } else if (typeofcommand === "interaction"){
            const mentioneduser = message.guild.members.cache.find(user => message.options.getUser("user").id === user.id);
            if (!mentioneduser) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid Target!`).setColor(`Red`)] })
            if (mentioneduser === message.guild.members.cache.find(user => message.user.id)) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`Please I don't want you to die, you are the best murderer!`).setColor(`Red`)] })
            message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> You killed ${mentioneduser}!`).setColor(`Green`)] })
        }
    }
}
