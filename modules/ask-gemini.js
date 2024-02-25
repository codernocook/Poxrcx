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
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env["gemini_ai"]);
const generationModel = genAI.getGenerativeModel({ model: "gemini-pro" })

// Delay (prevent abusing AI)
let globalDelay = false;
const requestInterval = 60000; // Interval run to reset call request
const maxCallRequest = 60; // x request per minute
let callRequest = 0;

const get_chatAnswer = async function(promptRequest, returnResponseFunction) {
    // Prevent error and bugs wasting request resource
    if (promptRequest && typeof(promptRequest) === "string" && promptRequest?.toString() && typeof(promptRequest?.toString()) === "string" && promptRequest?.toString().replace(" ", "") !== "" && returnResponseFunction !== undefined && returnResponseFunction !== null && returnResponseFunction && typeof(returnResponseFunction) === "function") {
        const result = await generationModel.generateContent(promptRequest?.toString());
        const response = await result["response"];
        
        if (response && response["text"] && typeof(response["text"]) === "function") {
            const response_text = response["text"]();

            // Return data back
            return returnResponseFunction(response_text)
        }
    }
}

setInterval(() => {
    callRequest = 0;
}, Number(requestInterval) || 60000)

module.exports = {
    data: new SlashCommandBuilder()
		.setName("ask-gemini")
		.setDescription("Chat with Gemini AI.")
        .addStringOption(option =>
            option.setName("prompt").setDescription("The message.").setRequired(true)
        ),
    async execute(argument, message, EmbedBuilder, client, typeofcommand, database_service) {
        if (typeofcommand === "message") {
            let chatmessageget = argument.slice(0).join(" ")
            if (!chatmessageget) return;
            
            // Max request respond
            if (callRequest >= maxCallRequest) {
                return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Sorry, we reached the API call limit. Please wait 5 seconds, and try again.`).setColor(`Red`)] })
            }

            // Slowdown
            if (globalDelay === true) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Sorry, You need to slowdown.`).setColor(`Red`)] })
            globalDelay = true;

            try {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription("Please wait, generating ... (It will take 5s - 10s).").setColor(`Blue`)] }).then(currentMessage => {
                    if (!currentMessage) return;
                    try {
                        get_chatAnswer(chatmessageget, (chatContent) => {
                            // Set call request
                            callRequest++;

                            // Send back
                            if (chatContent) {
                                currentMessage.edit({ embeds: [new EmbedBuilder().setDescription(`**Prompt**: ${chatmessageget}\n\n**Gemini**: ${chatContent?.toString()}`).setColor(`Green`)] })
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
                globalDelay = false;
            }, 3000);
        } else if (typeofcommand === "interaction"){
            let chatmessageget = message.options.getString("prompt");
            if (!chatmessageget) return;

            if (globalDelay === true) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Sorry, You need to slowdown.`).setColor(`Red`)] })
            globalDelay = true;

            try {
                get_chatAnswer(chatmessageget, (chatContent) => {
                    // Set call request
                    callRequest++;
                    
                    if (chatContent) {
                        message.editReply({ embeds: [new EmbedBuilder().setDescription(`**Prompt**: ${chatmessageget}\n\n**Gemini**: ${chatContent?.toString()}`).setColor(`Green`)] })
                    } else {
                        message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't get the answer, please try again.`).setColor(`Red`)] })
                    }
                })
            } catch {
                message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't get the answer, please try again.`).setColor(`Red`)] })
            }

            setTimeout(() => {
                globalDelay = false;
            }, 3000);
        }
    }
}
