const { SlashCommandBuilder } = require("@discordjs/builders")

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
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> User ${member} got hacked, i also installed a rat in their computer, i sent ${member} information to everyone`).setColor(`Green`)] })
            }else {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Failed to hack this user!`).setColor(`Red`)] })
            }
        } else if (typeofcommand === "interaction"){
          const memberinteraction = message.guild.members.cache.find(user => message.options.getUser("user").id === user.id);
            if (memberinteraction) {
                message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> User ${memberinteraction} got hacked, i also installed a rat in their computer, i sent ${memberinteraction} information to everyone`).setColor(`Green`)] })
            }else {
                message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Failed to hack this user!`).setColor(`Red`)] })
            }
        }
    }
}
