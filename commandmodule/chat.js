const { SlashCommandBuilder } = require("@discordjs/builders");
const youchatwrapper = require("@codernocook/youchatwrapper");
let rate_limit = "😔duetohighdemand,i'mexperiencingissuesbriefly.pleasetryagainlaterorusethealltabtogetananswerinthemeantime."

//Settings
youchatwrapper.apiKey = ""
youchatwrapper.cloudflare_message_bypass = true;
youchatwrapper.retry = true;
youchatwrapper.cloudflare_retry_limit = 5;
youchatwrapper.retry_limit = 5;

module.exports = {
    data: new SlashCommandBuilder()
		.setName("chat")
		.setDescription("Chat with YouChat (you.com), not ChatGPT (not many country support, paid)")
        .addStringOption(option =>
            option.setName("prompt").setDescription("the message to chat with AI").setRequired(true)
        ),
    async execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            let chatmessageget = argument.slice(0).join(" ")
            if (!chatmessageget) return
            try {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription("Please wait, getting answer ...").setColor(`Blue`)] }).then(currentMessage => {
                    if (!currentMessage) return;
                    try {
                        youchatwrapper.chat(chatmessageget, function(callback) {
                            if (typeof(callback) !== "string") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't get the answer, please try again.`).setColor(`Red`)] });
                            if (callback.toLowerCase().replace(/ /g,'') !== rate_limit) {
                                currentMessage.edit({ embeds: [new EmbedBuilder().setDescription(`**Prompt**: ${chatmessageget}\n\n**GPT-3**: ${callback}`).setColor(`Green`)] })
                            } else {
                                currentMessage.edit({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please try again in few seconds.`).setColor(`Red`)] })
                            }
                        })
                    } catch {
                        message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't get the answer, please try again.`).setColor(`Red`)] })
                    }
                })
            } catch {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't get the answer, please try again.`).setColor(`Red`)] })
            }
        } else if (typeofcommand === "interaction"){
            let chatmessageget = message.options.getString("prompt");
            if (!chatmessageget) return;
            await message.deferReply();

            try {
                youchatwrapper.chat(chatmessageget, function(callback) {
                    if (typeof(callback) !== "string") return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't get the answer, please try again.`).setColor(`Red`)] });
                    if (callback.toLowerCase().replace(/ /g,'') !== rate_limit) {
                        message.editReply({ embeds: [new EmbedBuilder().setDescription(`**Prompt**: ${chatmessageget}\n\n**GPT-3**: ${callback}`).setColor(`Green`)] })
                    } else {
                        message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please try again in few seconds.`).setColor(`Red`)] })
                    }
                })
            } catch {
                message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't get the answer, please try again.`).setColor(`Red`)] })
            }
        }
    }
}