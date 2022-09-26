module.exports = {
    name: 'Ping',
    description: "Reply with pong!",
    execute(argument, message) {
        message.channel.send(`Pong with 0 ping`)
    }
}