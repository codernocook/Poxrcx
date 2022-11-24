const { SlashCommandBuilder } = require("@discordjs/builders")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
		.setName("roblox")
		.setDescription("Get Roblox user/Experience Infomation by ID.")
        .addSubcommand(subcommand =>
			subcommand
				.setName("user")
				.setDescription("Get Roblox User Infomation")
				.addStringOption(option =>
					option.setName("user-id").setDescription("The Userid of the User").setRequired(true)
				),
		),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            const commandcalltype = argument[0]
            let infomation = argument.slice(1).join(" ");
            if (!infomation) return message.channel.send()
            if (commandcalltype === "user") {
                fetch(`https://api.roblox.com/users/${infomation}`).then(res => res.json()).then(json => {
                    function IsOnline() {
                        if (!json) return;
                        if (json.IsOnline === false) {
                            return "No"
                        }else if (json.IsOnline === true) {
                            return "Yes"
                        }
                    }

                    if (!json["errors"]) {
                        message.channel.send({ embeds: [new EmbedBuilder().setTitle(`${json.Username}`).setDescription(`Username: ${json.Username}\nUserId: ${json.Id}\nOnline: ${IsOnline()}`).setColor(`Blue`)] });
                    }else {
                        message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild Roblox user!`).setColor(`Red`)] });
                    }
                })
            }
        } else if (typeofcommand === "interaction"){
            if (message.options.getSubcommand() === "user") {
                let infomation = message.options.getString("user-id")
                fetch(`https://api.roblox.com/users/${infomation}`).then(res => res.json()).then(json => {
                    function IsOnline() {
                        if (!json) return;
                        if (json.IsOnline === false) {
                            return "No"
                        }else if (json.IsOnline === true) {
                            return "Yes"
                        }
                    }

                    if (!json["errors"]) {
                        message.reply({ embeds: [new EmbedBuilder().setTitle(`${json.Username}`).setDescription(`Username: ${json.Username}\nUserId: ${json.Id}\nOnline: ${IsOnline()}`).setColor(`Blue`)] });
                    }else {
                        message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild Roblox user!`).setColor(`Red`)] });
                    }
                })
            }
        }
    }
}