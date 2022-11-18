const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("rat")
		.setDescription("Install a rat in their computer/phone.")
        .addMentionableOption(option =>
            option.setName("user").setDescription("User to hack").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        const member = message.mentions.members.first();
        const memberinteration = message.options.getMentionable("user")
        if (typeofcommand === "message") {
            if (member) {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> User ${member} got hacked, i also installed a rat in their computer, i sent ${member} information to everyone`).setColor(`Green`)] })
            }else {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Failed to hack this user!`).setColor(`Red`)] })
            }
        } else if (typeofcommand === "interaction"){
            if (member) {
                message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> User ${memberinteration} got hacked, i also installed a rat in their computer, i sent ${memberinteration} information to everyone`).setColor(`Green`)] })
            }else {
                message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Failed to hack this user!`).setColor(`Red`)] })
            }
        }
    }
}
