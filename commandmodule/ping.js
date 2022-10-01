module.exports = {
    name: 'Ping',
    description: "Reply with pong!",
    execute(argument, message, EmbedBuilder) {
        message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Pong with 0 ping!`).setColor(`Green`)] })
        //message.channel.send(`Pong with 0 ping!`)
    }
}