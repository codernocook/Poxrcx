const { SlashCommandBuilder } = require("@discordjs/builders")
const googleIt = require("google-it")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("google")
		.setDescription("Search something on google")
        .addStringOption(option =>
            option.setName("search").setDescription("The keyword you want to search").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            let searchquery = argument.join(" ")
            if (!searchquery) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You need a keyword to search on google.`).setColor(`Red`)] })
            if (searchquery && searchquery.trim() === "") {
                return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You need a keyword to search on google.`).setColor(`Red`)] })
            }
            const embed = new EmbedBuilder().setTitle("Google Search Results:").addField({name: `Keyword:`, value: `\`${searchquery}\``}).setColor(`Blue`)
            googleIt({'query': searchquery, 'no-display': true, 'limit': 5}).then(results => {
                results.forEach(function(item, index) { 
                    embed.addField({
                        name: `${index + 1}: ${item.title}`,
                        value: `**${item.link}**`
                    })
                });
                
                message.channel.send({ embeds: [embed]});
            }).catch(err => {
                // any possible errors that might have occurred (like no Internet connection)
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Something went wrong, maybe connection issue. Try again!`).setColor(`Red`)] })
            });
        } else if (typeofcommand === "interaction"){
            let searchquery = message.options.getString("search")
            if (!searchquery) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You need a keyword to search on google.`).setColor(`Red`)] })
            if (searchquery && searchquery.trim() === "") {
                return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You need a keyword to search on google.`).setColor(`Red`)] })
            }
            const embed = new EmbedBuilder().setTitle("Google Search Results:").addField({name: `Keyword:`, value: `\`${searchquery}\``}).setColor(`Blue`)
            googleIt({'query': searchquery, 'no-display': true, 'limit': 5}).then(results => {
                results.forEach(function(item, index) { 
                    embed.addField({
                        name: `${index + 1}: ${item.title}`,
                        value: `**${item.link}**`
                    })
                });
                
                message.reply({ embeds: [embed]});
            }).catch(err => {
                // any possible errors that might have occurred (like no Internet connection)
                message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Something went wrong, maybe connection issue. Try again!`).setColor(`Red`)] })
            });
        }
    }
}
