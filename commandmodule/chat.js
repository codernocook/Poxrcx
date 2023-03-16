const { SlashCommandBuilder } = require("@discordjs/builders");
const youchatwrapper = require("@codernocook/youchatwrapper");
let rate_limit = "😔duetohighdemand,i'mexperiencingissuesbriefly.pleasetryagainlaterorusethealltabtogetananswerinthemeantime."
let rate_limit_1 = "duetocloudflarelimitsi'mcurentlygettingnewcookies,pleasetryagain."
youchatwrapper.apiKey = ""

module.exports = {
    data: new SlashCommandBuilder()
		.setName("chat")
		.setDescription("Chat with YouChat (you.com), not ChatGPT (not many country support)")
        .addStringOption(option =>
            option.setName("prompt").setDescription("the message to chat with AI").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            let chatmessageget = argument.slice(0).join(" ")
            if (!chatmessageget) return
            try {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription("Please wait, getting answer ...").setColor(`Blue`)] }).then(currentMessage => {
                    if (!currentMessage) return;
                    try {
                        youchatwrapper.chat(chatmessageget, function(callback) {
                            if (typeof(callback) !== "string") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't get the answer, please try again.`).setColor(`Red`)] });
                            if (callback.trim().toLowerCase() !== rate_limit || callback.trim().toLowerCase() !== rate_limit_1) {
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
            let chatmessageget = message.options.getString("message")
            if (!chatmessageget) return
            try {
                message.reply({ embeds: [new EmbedBuilder().setDescription("Please wait, getting answer ...").setColor(`Blue`)] }).then(currentMessage => {
                    try {
                        youchatwrapper.chat(chatmessageget, function(callback) {
                            if (typeof(callback) !== "string") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't get the answer, please try again.`).setColor(`Red`)] });
                            if (callback.trim().toLowerCase() !== rate_limit || callback.trim().toLowerCase() !== rate_limit_1) {
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
        }
    }
}