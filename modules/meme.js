/*
    Poxrcx
    Copyright (C) 2023  codernocook

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const { SlashCommandBuilder } = require("@discordjs/builders")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
    data: new SlashCommandBuilder()
		.setName("meme")
		.setDescription("Get a random meme!"),
    execute(argument, message, EmbedBuilder, client, typeofcommand, database_service) {
        fetch("https://reddit.com/r/memes/random/.json").then(res => res.json()).then(json => {
            const randomPosition = randomIntFromInterval(0, json[0].data.children.length || 0);
            let permalink = json[0].data.children[randomPosition].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = json[0].data.children[randomPosition].data.url;
            let memeTitle = json[0].data.children[randomPosition].data.title;
            let memeUpvotes = json[0].data.children[randomPosition].data.ups;
            let memeDownvotes = json[0].data.children[randomPosition].data.downs;
            let memeNumComments = json[0].data.children[randomPosition].data.num_comments;
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