const { SlashCommandBuilder } = require("@discordjs/builders")
const fetch = require("node-fetch")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("meme")
		.setDescription("Get a random meme!"),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        fetch("https://reddit.com/r/memes/random/.json").then(res => res.json()).then(json => {
            console.log(json)
            let content = JSON.parse(json.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeDownvotes = content[0].data.children[0].data.downs;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            if (typeofcommand === "message") {
                message.channel.send({ embeds: [new EmbedBuilder().setTitle(`${memeTitle}`).setURL(`${memeUrl}`).setImage(memeImage).setFooter(`:thumbsup: ${memeUpvotes} | :thumbsdown: ${memeDownvotes} | :envelope: ${memeNumComments}`).setColor(`Blue`)] });
            } else if (typeofcommand === "interaction"){
                message.reply({ embeds: [new EmbedBuilder().setTitle(`${memeTitle}`).setURL(`${memeUrl}`).setImage(memeImage).setFooter(`:thumbsup: ${memeUpvotes} | :thumbsdown: ${memeDownvotes} | :envelope: ${memeNumComments}`).setColor(`Blue`)] });
            }
        })
    }
}
