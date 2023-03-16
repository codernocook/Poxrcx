const { SlashCommandBuilder } = require("@discordjs/builders");
const youchatwrapper = require("@codernocook/youchatwrapper");
youchatwrapper.apiKey = ""

module.exports = {
    data: new SlashCommandBuilder()
		.setName("chat")
		.setDescription("Chat with YouChat (you.com), not ChatGPT (not many country support)")
        .addStringOption(option =>
            option.setName("message").setDescription("the message to chat with AI").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            let chatmessageget = argument.slice(0).join(" ")
            if (!chatmessageget) return
            message.channel.send({ embeds: [new EmbedBuilder().setDescription("Please wait, getting answer ...").setColor(`Green`)] }).then(currentMessage => {
                try {
                    youchatwrapper.chat(chatmessageget, function(callback) {
                        currentMessage.edit({ embeds: [new EmbedBuilder().setDescription(`**Question**: ${chatmessageget}\n\n**GPT-3**: ${callback}`).setColor(`Green`)] }).catch(e => console.log(e));
                    })
                } catch {
                    currentMessage.edit({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't get the answer, please try again.`).setColor(`Green`)] }).catch(e => console.log(e));
                }
            })
        } else if (typeofcommand === "interaction"){
            let chatmessageget = message.options.getString("message")
            if (!chatmessageget) return
            message.reply({ embeds: [new EmbedBuilder().setDescription("Please wait, getting answer ...").setColor(`Green`)] }).then(currentMessage => {
                try {
                    youchatwrapper.chat(chatmessageget, function(callback) {
                        currentMessage.edit({ embeds: [new EmbedBuilder().setDescription(`Question: ${chatmessageget}\n\nGPT-3: ${callback}`).setColor(`Green`)] }).catch(e => console.log(e));
                    })
                } catch {
                    currentMessage.edit({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't get the answer, please try again.`).setColor(`Green`)] }).catch(e => console.log(e));
                }
            })
        }
    }
}