const { SlashCommandBuilder } = require("@discordjs/builders")
const RandomPuppy = require("random-puppy")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("meme")
		.setDescription("Get a random meme!"),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        const SubReddit = ["meme", "me_irl", "dankmeme"]
        const randomsearch = SubReddit[Math.floor(Math.random() * SubReddit.length)];
        const memeimages = RandomPuppy(randomsearch);
        if (typeofcommand === "message") {
            message.channel.send({ embeds: [new EmbedBuilder().setTitle(`From /r/%${randomsearch}`).setImage(memeimages).setURL(`http://reddit.com/${random}`).setColor(`Blue`)] });
        } else if (typeofcommand === "interaction"){
            message.reply({ embeds: [new EmbedBuilder().setTitle(`From /r/%${randomsearch}`).setImage(memeimages).setURL(`http://reddit.com/${random}`).setColor(`Blue`)] });
        }
    }
}
