module.exports = {
    name: 'Help',
    description: "Check help log!",
    execute(argument, message) {
        message.channel.send("There are no command btw, just kidding!\nPrefix: ./\nping: send useless message\nkick: [user] [reason]\nban: [user] [reason]\ntimeout [user] [length] [reason]\nannoy but don't try to annoy me you will reget it\nVersion: 1.0.0\nMade by Itzporium!")
    }
}