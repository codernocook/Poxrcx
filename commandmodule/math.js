const { SlashCommandBuilder } = require("@discordjs/builders")
const math = require("mathjs")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("math")
		.setDescription("calculate a math")
        .addStringOption(option =>
            option.setName("calculate").setDescription("The math you want to calculate").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            const mathquestion = argument.slice(0).join(" ")
            if (!mathquestion) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please provide a valid equation.`).setColor(`Red`)] })
            if (mathquestion.trim() === "") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please provide a valid equation.`).setColor(`Red`)] })
            
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`${mathquestion} = ${math.evaluate(mathquestion)}`).setColor(`Blue`)] }).catch(err => {message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please provide a valid equation.`).setColor(`Red`)] })})
        } else if (typeofcommand === "interaction"){
            const mathquestion = message.options.getString("calculate")
            if (!mathquestion) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please provide a valid equation.`).setColor(`Red`)] })
            if (mathquestion.trim() === "") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please provide a valid equation.`).setColor(`Red`)] })
            
            message.editReply({ embeds: [new EmbedBuilder().setDescription(`${mathquestion} = ${math.evaluate(mathquestion)}`).setColor(`Blue`)] }).catch(err => {message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please provide a valid equation.`).setColor(`Red`)] })})
        }
    }
}