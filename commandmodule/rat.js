const { SlashCommandBuilder } = require("@discordjs/builders");
const { random } = require("mathjs");

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
    data: new SlashCommandBuilder()
		.setName("rat")
		.setDescription("Install a rat in their computer/phone.")
        .addUserOption(option =>
            option.setName("user").setDescription("User to hack").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            const member = message.mentions.members.first();
            if (member) {
                if (member.id === message.author.id) {
                    return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Self destruction, goodbye.`).setColor(`Green`)] });
                }else {
                    return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> User ${member} got hacked!\nIp address: ${randomNum(0, 255)}.${randomNum(0, 255)}.${randomNum(0, 255)}.${randomNum(0, 255)}\nHuman: maybe a human or a bot\nAlive: true and false\nAge: ${randomNum(13, 100)}\n Iq ${90, 115}`).setColor(`Green`)] });
                }
            } else {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Failed to hack this user!`).setColor(`Red`)] });
            }
        } else if (typeofcommand === "interaction"){
            const member = message.guild.members.cache.find(user => message.options.getUser("user").id === user.id);
            if (member) {
                if (member.id === message.user.id) {
                    return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Self destruction, goodbye.`).setColor(`Green`)] });
                }else {
                    return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> User ${member} got hacked!\nIp address: ${randomNum(0, 255)}.${randomNum(0, 255)}.${randomNum(0, 255)}.${randomNum(0, 255)}\nHuman: maybe a human or a bot\nAlive: true and false\nAge: ${randomNum(13, 100)}\n Iq ${90, 115}`).setColor(`Green`)] });
                }
            } else {
                message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Failed to hack this user!`).setColor(`Red`)] });
            }
        }
    }
}
