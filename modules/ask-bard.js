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
let delayed = false;

const get_chatAnswer = async function(bardToken, quest) {
    return import("bard-ai").then(async (bard_module) => {
        await bard_module.init(bardToken?.toString().trim())
        
        return bard_module.askAI(quest?.toString())
    })
}

module.exports = {
    data: new SlashCommandBuilder()
		.setName("ask-bard")
		.setDescription("Chat with Google Bard AI.")
        .addStringOption(option =>
            option.setName("prompt").setDescription("The message.").setRequired(true)
        ),
    async execute(argument, message, EmbedBuilder, client, typeofcommand, database_service) {
        if (typeofcommand === "message") {
            let chatmessageget = argument.slice(0).join(" ")
            if (!chatmessageget) return;
            
            if (delayed === true) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Sorry, You need to slowdown.`).setColor(`Red`)] })
            delayed = true;

            try {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription("Please wait, generating ... (It's take 5s - 10s).").setColor(`Blue`)] }).then(currentMessage => {
                    if (!currentMessage) return;
                    try {
                        get_chatAnswer(process.env["bardToken"], chatmessageget).then((chatContent) => {
                            if (chatContent) {
                                currentMessage.edit({ embeds: [new EmbedBuilder().setDescription(`**Prompt**: ${chatmessageget}\n\n**Bard**: ${chatContent?.toString()}`).setColor(`Green`)] })
                            } else {
                                currentMessage.edit({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't get the answer, please try again.`).setColor(`Red`)] })
                            }
                        })
                    } catch {
                        message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't get the answer, please try again.`).setColor(`Red`)] })
                    }
                })
            } catch {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't get the answer, please try again.`).setColor(`Red`)] })
            }
            setTimeout(() => {
                delayed = false;
            }, 3000);
        } else if (typeofcommand === "interaction"){
            let chatmessageget = message.options.getString("prompt");
            if (!chatmessageget) return;

            if (delayed === true) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Sorry, You need to slowdown.`).setColor(`Red`)] })
            delayed = true;

            try {
                get_chatAnswer(process.env["bardToken"], chatmessageget).then((chatContent) => {
                    if (chatContent) {
                        message.editReply({ embeds: [new EmbedBuilder().setDescription(`**Prompt**: ${chatmessageget}\n\n**Bard**: ${chatContent?.toString()}`).setColor(`Green`)] })
                    } else {
                        message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't get the answer, please try again.`).setColor(`Red`)] })
                    }
                })
            } catch {
                message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't get the answer, please try again.`).setColor(`Red`)] })
            }

            setTimeout(() => {
                delayed = false;
            }, 3000);
        }
    }
}