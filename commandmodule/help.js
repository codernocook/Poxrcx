module.exports = {
    name: 'Help',
    description: "Show the help info!",
    execute(argument, message, EmbedBuilder, client) {
        message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Prefix: ./\nPing: Reply with pong.\nKick: [user] [reason]\nBan: [user] [reason]\nUnban: [user] [reason]\nMute [user] [length] [reason]\nUnmute [user] [reason]\nKill: [user]\nAnnoy: Don't try to annoy me, it will make you a :clown:, :smiling_imp:!\nRat: it can hack to anyone [computer/phone] (its a fun command don't worry it not real)\nMeme: send a random meme in chat!\nHelp page: https://pox-commandx-website.vercel.app/help\nVersion: 2.0.5\nMade by Itzporium!`).setColor(`Blue`)] })
    }
}
