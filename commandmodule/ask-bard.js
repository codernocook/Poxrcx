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
    async execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            let chatmessageget = argument.slice(0).join(" ")
            if (!chatmessageget) return;
            
            if (delayed === true) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Sorry, You need to slowdown.`).setColor(`Red`)] })
            delayed = true;

            try {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription("Please wait, generating ... (It's take 1s - 5s).").setColor(`Blue`)] }).then(currentMessage => {
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