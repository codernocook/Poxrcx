module.exports = {
    name: 'annoy',
    description: "annoy the bot",
    execute(argument, message) {
        message.channel.send("STOP ANNOYING BITCH")
        message.channel.send(`@everyone This shit ${message.author} annoying me`)
    }
}