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
		.setName("stats")
		.setDescription("Show the server stat."),
    execute(argument, message, EmbedBuilder, client, typeofcommand, database_service) {
        if (typeofcommand === "message") {
            function banner_url() {
                if (message.guild.bannerURL() !== null) {
                    return `**[Image](${message.guild.bannerURL()})**`;
                } else if (message.guild.bannerURL() === null) {
                    return "No";
                }
            }
            message.channel.send({ embeds: [new EmbedBuilder().setThumbnail(message.guild.iconURL({ "extension": "webp", "forceStatic": false, "size": 128 })).setDescription(`**Server Name**: ${message.guild.name}\nOwner: <@${message.guild.ownerId}>\nMember(s): ${message.guild.memberCount}\nCreated at: ${new Date(message.guild.createdTimestamp).getDay()}/${new Date(message.guild.createdTimestamp).getMonth()}/${new Date(message.guild.createdTimestamp).getFullYear()} (dd/mm/yyyy)\nCreated at (System Time): ${message.guild.createdAt}\nBanner (url): ${banner_url()}\nNSFW Level: ${message.guild.nsfwLevel}\nVerify: ${message.guild.verified}\nDiscord Partner: ${message.guild.partnered}`).setColor(`Blue`)] });
        } else if (typeofcommand === "interaction"){
            function banner_url() {
                if (message.guild.bannerURL() !== null) {
                    return `**[Image](${message.guild.bannerURL()})**`;
                } else if (message.guild.bannerURL() === null) {
                    return "No";
                }
            }
            message.editReply({ embeds: [new EmbedBuilder().setThumbnail(message.guild.iconURL({ "extension": "webp", "forceStatic": false, "size": 128 })).setDescription(`**Server Name**: ${message.guild.name}\nOwner: <@${message.guild.ownerId}>\nMember(s): ${message.guild.memberCount}\nCreated at: ${new Date(message.guild.createdTimestamp).getDay()}/${new Date(message.guild.createdTimestamp).getMonth()}/${new Date(message.guild.createdTimestamp).getFullYear()} (dd/mm/yyyy)\nCreated at (System Time): ${message.guild.createdAt}\nBanner (url): ${banner_url()}\nNSFW Level: ${message.guild.nsfwLevel}\nVerify: ${message.guild.verified}\nDiscord Partner: ${message.guild.partnered}`).setColor(`Blue`)] });
        }
    }
}