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

const { SlashCommandBuilder } = require("@discordjs/builders");
const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

let delayed = false;

module.exports = {
    data: new SlashCommandBuilder()
		.setName("chat")
		.setDescription("Create a new thread and Google Bard will respond to every message sent in the thread.")
        .addStringOption(option =>
            option.setName("name").setDescription("The name you want to put in the thread.").setRequired(true)
        ),
    async execute(argument, message, EmbedBuilder, client, typeofcommand, database_service) {
        if (typeofcommand === "message") {
            let chatmessageget = argument.slice(0).join(" ")
            if (!chatmessageget) return;
            
            if (delayed === true) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Sorry, You need to slowdown.`).setColor(`Red`)] })
            delayed = true;

            const continue_button = new ButtonBuilder().setCustomId('continue').setLabel('Yes').setStyle(ButtonStyle.Success);
            const no_button = new ButtonBuilder().setCustomId('cancel').setLabel('No').setStyle(ButtonStyle.Danger);
            const row = new ActionRowBuilder.addComponents(continue_button, no_button);

            message.channel.send({ embeds: [new EmbedBuilder().setDescription("**Are you sure you want to create a new thread? This action cannot be undone.**\nClick `Yes` to continue and `No` to stop.").setColor(`Blue`)], components: [row] }).click()

            setTimeout(() => {
                delayed = false;
            }, 3000);
        } else if (typeofcommand === "interaction"){
            let chatmessageget = message.options.getString("name");
            if (!chatmessageget) return;

            if (delayed === true) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Sorry, You need to slowdown.`).setColor(`Red`)] })
            delayed = true;

            const continue_button = new ButtonBuilder().setCustomId('_continue_bard_poxrcx_codernocook').setLabel('Yes').setStyle(ButtonStyle.Success);
            const no_button = new ButtonBuilder().setCustomId('_cancel_bard_poxrcx_codernocook').setLabel('No').setStyle(ButtonStyle.Danger);
            const row = new ActionRowBuilder.addComponents(continue_button, no_button);

            message.reply({ embeds: [new EmbedBuilder().setDescription("**Are you sure you want to create a new thread? This action cannot be undone.**\nClick `Yes` to continue and `No` to stop.").setColor(`Blue`)], components: [row] });

            setTimeout(() => {
                delayed = false;
            }, 3000);
        }
    }
}