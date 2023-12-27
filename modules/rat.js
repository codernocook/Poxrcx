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
const { random } = require("mathjs");

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
    data: new SlashCommandBuilder()
		.setName("rat")
		.setDescription("Install a rat in their computer/phone.")
        .addUserOption(option =>
            option.setName("user").setDescription("User to hack").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand, database_service) {
        if (typeofcommand === "message") {
            const member = message.mentions.members.first();
            if (member) {
                if (member.id === message.author.id) {
                    return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Self destruction, goodbye.`).setColor(`Green`)] });
                }else {
                    return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> User ${member} got hacked!\nIp address: ${randomNum(0, 255)}.${randomNum(0, 255)}.${randomNum(0, 255)}.${randomNum(0, 255)}\nHuman: maybe a human or a bot\nAlive: true and false\nAge: ${randomNum(13, 100)}\n Iq ${90, 115}`).setColor(`Green`)] });
                }
            } else {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Failed to hack this user!`).setColor(`Red`)] });
            }
        } else if (typeofcommand === "interaction"){
            const member = message.guild.members.cache.find(user => message.options.getUser("user").id === user.id);
            if (member) {
                if (member.id === message.user.id) {
                    return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Self destruction, goodbye.`).setColor(`Green`)] });
                }else {
                    return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> User ${member} got hacked!\nIp address: ${randomNum(0, 255)}.${randomNum(0, 255)}.${randomNum(0, 255)}.${randomNum(0, 255)}\nHuman: maybe a human or a bot\nAlive: true and false\nAge: ${randomNum(13, 100)}\n Iq ${90, 115}`).setColor(`Green`)] });
                }
            } else {
                message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Failed to hack this user!`).setColor(`Red`)] });
            }
        }
    }
}
