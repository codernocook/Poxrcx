const { SlashCommandBuilder } = require("@discordjs/builders")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
		.setName("meme")
		.setDescription("Get a random meme!"),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        fetch("https://reddit.com/r/memes/random/.json").then(res => res.json()).then(json => {
            let permalink = json[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = json[0].data.children[0].data.url;
            let memeTitle = json[0].data.children[0].data.title;
            let memeUpvotes = json[0].data.children[0].data.ups;
            let memeDownvotes = json[0].data.children[0].data.downs;
            let memeNumComments = json[0].data.children[0].data.num_comments;
            if (typeofcommand === "message") {
                try {
                    //test if the url is safe
                    message.channel.send({ embeds: [new EmbedBuilder().setTitle(`${memeTitle}`).setURL(`${memeUrl}`).setImage(memeImage).setFooter({ text: `👍 ${memeUpvotes} | 👎 ${memeDownvotes} | ✉️ ${memeNumComments}`}).setColor(`Blue`)] });
                } catch (err) {
                    //it not safe we may crash from this reddit exploit
                    console.log(err)
                    message.channel.send({ embeds: [new EmbedBuilder().setDescription("<:PoxError:1025977546019450972> This meme have a bug, please try again.").setColor(`Red`)] }).catch(err => {console.log(err)})
                }
            } else if (typeofcommand === "interaction"){
                message.editReply({ embeds: [new EmbedBuilder().setTitle(`${memeTitle}`).setURL(`${memeUrl}`).setImage(memeImage).setFooter({ text: `👍 ${memeUpvotes} | 👎 ${memeDownvotes} | ✉️ ${memeNumComments}`}).setColor(`Blue`)] });
                try {
                    //test if the url is safe
                    message.editReply({ embeds: [new EmbedBuilder().setTitle(`${memeTitle}`).setURL(`${memeUrl}`).setImage(memeImage).setFooter({ text: `👍 ${memeUpvotes} | 👎 ${memeDownvotes} | ✉️ ${memeNumComments}`}).setColor(`Blue`)] });
                } catch (err) {
                    //it not safe we may crash from this reddit exploit
                    console.log(err)
                    message.editReply({ embeds: [new EmbedBuilder().setDescription("<:PoxError:1025977546019450972> This meme have a bug, please try again.").setColor(`Red`)] }).catch(err => {console.log(err)})
                }
            }
        })
    }
}