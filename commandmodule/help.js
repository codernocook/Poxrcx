module.exports = {
    name: 'Help',
    description: "Check help log!",
    execute(argument, message, EmbedBuilder) {
        message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Prefix: ./\nping: Send back nothing.\nkick: [user] [reason]\nban: [user] [reason]\ntimeout [user] [length] [reason]\nkill: [user] (kill user you want but it useless, just wait for another update)\nAnnoy: Don't try to annoy me, it will make you a :clown:, :smiling_imp:!\nVersion: 2.0.0\nMade by Itzporium!`).setColor(`Blue`)] })
        //message.channel.send("Prefix: ./\nping: Send back nothing.\nkick: [user] [reason]\nban: [user] [reason]\ntimeout [user] [length] [reason]\nkill: [user] (kill user you want but it useless, just wait for another update)\nAnnoy: Don't try to annoy me, it will make you a :clown:, :smiling_imp:!\nVersion: 2.0.0\nMade by Itzporium!")
    }
}