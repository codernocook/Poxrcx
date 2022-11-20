const { SlashCommandBuilder } = require("@discordjs/builders")
import { got } from "got"

module.exports = {
    data: new SlashCommandBuilder()
		.setName("meme")
		.setDescription("Get a random meme!"),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        got("https://reddit.com/r/memes/random/.json").then(response => {
            let content = JSON.parse(response.body);
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
