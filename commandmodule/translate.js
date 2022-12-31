const { SlashCommandBuilder } = require("@discordjs/builders")
const translate = require("translate-google")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("translate")
		.setDescription("Translate a language")
        .addStringOption(option =>
            option.setName("from").setDescription("The main language").setRequired(true)
        )
        .addStringOption(option =>
            option.setName("to").setDescription("The language you want to translate to").setRequired(true)
        )
        .addStringOption(option =>
            option.setName("word").setDescription("The word you want to translate").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            const fromlanguage = argument[0].toLowerCase();
            const tolanguage = argument[1].toLowerCase();
            const word = argument.slice(2).join(" ");

            translate(word, {from: fromlanguage, to: tolanguage}).then(async (res) => {
                await message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Translate (${fromlanguage}): ${word}\nTo (${tolanguage}): ${res}`).setColor(`Blue`)] })
            }).catch(err => {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> An error has occured`).setColor(`Red`)] })
            })
        } else if (typeofcommand === "interaction"){
            const fromlanguage = message.options.getString("from").toLowerCase();
            const tolanguage = message.options.getString("to").toLowerCase();
            const word = message.options.getString("word");

            translate(word, {from: fromlanguage, to: tolanguage}).then(async (res) => {
                await message.reply({ embeds: [new EmbedBuilder().setDescription(`Translate (${fromlanguage}): ${word}\nTo (${tolanguage}): ${res}`).setColor(`Blue`)] })
            }).catch(err => {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> An error has occured`).setColor(`Red`)] })
            })
        }
    }
}
