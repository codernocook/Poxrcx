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

// Variabes
const { SlashCommandBuilder } = require("@discordjs/builders")
const { ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require("discord.js");

// Generate string function
const generateRandomString = (length) => {
	let result = '';
	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

module.exports = {
    data: new SlashCommandBuilder()
		.setName("gemini-conversation")
		.setDescription("Start a conversation with Gemini AI"),
    async execute(argument, message, EmbedBuilder, client, typeofcommand, database_service) {
      // Variables
      const actionTime = Date.now();

      // Check message type
      if (typeofcommand === "message") {
          const author = message.author

          // Buttons (Yes and no)
          const confirmButton = new ButtonBuilder()
            .setCustomId("itzporium.poxrcx.module.gemini.confirm")
            .setLabel("Yes")
            .setStyle(ButtonStyle.Primary)

          const noButton = new ButtonBuilder()
            .setCustomId("itzporium.poxrcx.module.gemini.stop")
            .setLabel("No")
            .setStyle(ButtonStyle.Danger)

          const actionRow = new ActionRowBuilder()
            .addComponents(confirmButton, noButton)

          // Reply sure message
          const messageResponse = await message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Are you sure, this action cannot be undone.`).setColor(`Blue`)], components: [actionRow] })

          // Response collector
          let disabled_actionRequest = false;
          const author_filter = (i) => i.user.id === author.id
          const actionCollector = messageResponse.createMessageComponentCollector({
            componentType: ComponentType.Button,
            author_filter
          })

          actionCollector.on("collect", async (interaction) => {
            // Not allowed to execute if already disabled
            if (disabled_actionRequest === true) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Action already performed.`).setColor(`Red`)] });
            disabled_actionRequest = true;

            // Disable all buttons
            actionRow.components.forEach((buttons) => buttons.setDisabled(true));

            // Perform action
            if (interaction.customId === "itzporium.poxrcx.module.gemini.confirm") {
              const author_action = interaction.user;

              // Make sure the one who do this action is the main author
              if (author_action.id === author.id) {
                const message_thread = await message.channel.threads.create({
                  "name": `gemini-conversation-${actionTime}-${generateRandomString(10)}`,
                  "autoArchiveDuration": 60,
                  "reason": "A gemini conversation"
                })

                // Make the bot join, so it can receive message
                message_thread.join()

                // Reply
                messageResponse.edit({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Successfully created thread.`).setColor(`Green`)], components: [] })
                interaction.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Successfully created thread.`).setColor(`Green`)], components: [], ephemeral: true })
                messageResponse.delete()
              }
            } else if (interaction.customId === "itzporium.poxrcx.module.gemini.no") {
              messageResponse.edit({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Cancelled thread creation`).setColor(`Green`)], components: [] })
              interaction.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Cancelled thread creation`).setColor(`Green`)], components: [], ephemeral: true })
              messageResponse.delete()
            }
          })
        } else if (typeofcommand === "interaction") {
          const author = message.user

          // Buttons (Yes and no)
          const confirmButton = new ButtonBuilder()
            .setCustomId("itzporium.poxrcx.module.gemini.confirm")
            .setLabel("Yes")
            .setStyle(ButtonStyle.Primary)

          const noButton = new ButtonBuilder()
            .setCustomId("itzporium.poxrcx.module.gemini.stop")
            .setLabel("No")
            .setStyle(ButtonStyle.Danger)

          const actionRow = new ActionRowBuilder()
            .addComponents(confirmButton, noButton)

          // Reply sure message
          const messageResponse = await message.editReply({ embeds: [new EmbedBuilder().setDescription(`Are you sure, this action cannot be undone.`).setColor(`Blue`)], components: [actionRow] })

          // Response collector
          let disabled_actionRequest = false;
          const author_filter = (i) => i.user.id === author.id
          const actionCollector = messageResponse.createMessageComponentCollector({
            componentType: ComponentType.Button,
            author_filter
          })

          actionCollector.on("collect", async (interaction) => {
            // Not allowed to execute if already disabled
            if (disabled_actionRequest === true) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Action already performed.`).setColor(`Red`)] });
            disabled_actionRequest = true;

            // Disable all buttons
            actionRow.components.forEach((buttons) => buttons.setDisabled(true));

            // Perform action
            if (interaction.customId === "itzporium.poxrcx.module.gemini.confirm") {
              const author_action = interaction.user;

              // Make sure the one who do this action is the main author
              if (author_action.id === author.id) {
                const message_thread = await message.channel.threads.create({
                  "name": `gemini-conversation-${actionTime}-${generateRandomString(10)}`,
                  "autoArchiveDuration": 60,
                  "reason": "A gemini conversation"
                })

                // Make the bot join, so it can receive message
                message_thread.join()

                // Reply
                message.deleteReply();
                interaction.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Successfully created thread.`).setColor(`Green`)], components: [], ephemeral: true })
              }
            } else if (interaction.customId === "itzporium.poxrcx.module.gemini.no") {
              message.deleteReply();
              interaction.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Cancelled thread creation`).setColor(`Green`)], components: [], ephemeral: true })
            }
          })
        }
    }
}
