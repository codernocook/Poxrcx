module.exports = {
    name: 'Rat',
    description: "rat user computer/phone.",
    execute(argument, message, EmbedBuilder) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0])
        if (member) {
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`User ${member} got hacked, i also installed a rat in their computer, i sent ${member} information to everyone`).setColor(`Green`)] })
        }else {
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Failed to hack this user!`).setColor(`Green`)] })
        }
        //message.channel.send(`Pong with 0 ping!`)
    }
}