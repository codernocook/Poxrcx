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
                if (member.id === message.author.id) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Self destruction, goodbye.`).setColor(`Green`)] });
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> User ${member} got hacked, say goodbye.`).setColor(`Green`)] });
            }else {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Failed to hack this user!`).setColor(`Red`)] });
            }
        } else if (typeofcommand === "interaction"){
            const memberinteraction = message.guild.members.cache.find(user => message.options.getUser("user").id === user.id);
            if (memberinteraction) {
                if (member.id === message.user.id) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Self destruction, goodbye.`).setColor(`Green`)] });
                message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> User ${member} got hacked, say goodbye.`).setColor(`Green`)] });
            }else {
                message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Failed to hack this user!`).setColor(`Red`)] });
            }
        }
    }
}
