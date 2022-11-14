module.exports = {
    name: 'annoy',
    description: "annoy the bot",
    execute(argument, message, EmbedBuilder) {
        message.channel.send("STOP ANNOYING BITCH")
        message.channel.send(`everyone THIS SHIT IS ${message.author} ANNOYING ME!`)
        message.channel.send({ embeds: [new EmbedBuilder().setDescription(`${message.author} got banned forever.`).setColor(`Green`)] })
    }
}
