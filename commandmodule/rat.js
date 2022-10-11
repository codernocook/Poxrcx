module.exports = {
    name: 'Rat',
    description: "Install a rat in their computer/phone.",
    execute(argument, message, EmbedBuilder) {
        const member = message.mentions.members.first();
        if (member) {
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> User ${member} got hacked, i also installed a rat in their computer, i sent ${member} information to everyone`).setColor(`Green`)] })
        }else {
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Failed to hack this user!`).setColor(`Red`)] })
        }
    }
}
