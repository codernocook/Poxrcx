const { SlashCommandBuilder } = require("@discordjs/builders")
const ChatBot = require("discord-chatbot")
const ChatAI = new ChatBot({name: "Poxrcx", gender: "Male"});

module.exports = {
    data: new SlashCommandBuilder()
		.setName("chat")
		.setDescription("Chat with AI, not ChatGPT (not many country support)")
        .addStringOption(option =>
            option.setName("message").setDescription("the message to chat with AI").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            let chatmessageget = argument.slice(0).join(" ")
            if (!chatmessageget) return
            ChatAI.chat(chatmessageget).then(response=>message.channel.send({ embeds: [new EmbedBuilder().setDescription(response).setColor(`Green`)] })).catch(e => console.log(e))
            message.channel.send({ embeds: [new EmbedBuilder().setDescription().setColor(`Green`)] })
        } else if (typeofcommand === "interaction"){
            let chatmessageget = message.options.getString("message")
            if (!chatmessageget) return
            ChatAI.chat(chatmessageget).then(response=>message.reply({ embeds: [new EmbedBuilder().setDescription(response).setColor(`Green`)] })).catch(e => console.log(e))
        }
    }
}