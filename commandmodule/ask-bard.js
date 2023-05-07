const { SlashCommandBuilder } = require("@discordjs/builders");
let delayed = false;

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
                        fetch(`https://BardAPI.codernocook.repl.co`, { method: "POST", body: JSON.stringify({"key": process.env["bardToken"], "msg": chatmessageget}), headers: { 'Content-Type': 'application/json' }}).then(res => res.json()).then(json => {
                            if (json) {
                                if (json["error"] && json["error"] === "Message can't be blank") return currentMessage.edit({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't get the answer, please try again.`).setColor(`Red`)] });
                                if (json["content"]) {
                                    currentMessage.edit({ embeds: [new EmbedBuilder().setDescription(`**Prompt**: ${chatmessageget}\n\n**Bard**: ${json["content"]}`).setColor(`Green`)] })
                                } else {
                                    currentMessage.edit({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't get the answer, please try again.`).setColor(`Red`)] })
                                }
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
            await message.deferReply();

            if (delayed === true) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Sorry, You need to slowdown.`).setColor(`Red`)] })
            delayed = true;

            try {
                fetch(`https://BardAPI.codernocook.repl.co`, { method: "POST", body: JSON.stringify({"key": process.env["bardToken"], "msg": chatmessageget}), headers: { 'Content-Type': 'application/json' }}).then(res => res.json()).then(json => {
                    if (json) {
                        if (json["error"] && json["error"] === "Message can't be blank") return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't get the answer, please try again.`).setColor(`Red`)] });
                        if (json["content"]) {
                            message.editReply({ embeds: [new EmbedBuilder().setDescription(`**Prompt**: ${chatmessageget}\n\n**Bard**: ${json["content"]}`).setColor(`Green`)] })
                        } else {
                            message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't get the answer, please try again.`).setColor(`Red`)] })
                        }
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