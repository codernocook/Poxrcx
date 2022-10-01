module.exports = {
    name: 'Ping',
    description: "Reply with pong!",
    execute(argument, message, EmbedBuilder) {
        message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Bot ping is: 0`).setColor(`Green`)] }).then(messageget => {
            const ping = messageget.createdTimestamp - message.createdTimestamp;
            messageget.edit({ embeds: [new EmbedBuilder().setDescription(`Bot ping is: ${ping}`).setColor(`Green`)] })
        })
        //message.channel.send(`Pong with 0 ping!`)
    }
}