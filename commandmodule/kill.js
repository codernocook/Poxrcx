const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("kill")
		.setDescription("Destroy someone you hate!")
        .addUserOption(option =>
            option.setName("user").setDescription("User to kill").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            if (!argument[0]) message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild Target!`).setColor(`Red`)] })
            const mentioneduser = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0])
            if (!mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild Target!`).setColor(`Red`)] })
            if (message.member === mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Please I don't want you to die, you are the best murder!`).setColor(`Red`)] })
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> You killed ${mentioneduser}!`).setColor(`Green`)] })
        } else if (typeofcommand === "interaction"){
            const mentioneduser = message.guild.members.cache.find(user => message.options.getUser("user").id === user.id);
            if (!mentioneduser) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild Target!`).setColor(`Red`)] })
            if (mentioneduser === message.guild.members.cache.find(user => message.user.id)) return message.reply({ embeds: [new EmbedBuilder().setDescription(`Please I don't want you to die, you are the best murder!`).setColor(`Red`)] })
            message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> You killed ${mentioneduser}!`).setColor(`Green`)] })
        }
    }
}
