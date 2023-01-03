const { SlashCommandBuilder } = require("@discordjs/builders")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
		.setName("mc")
		.setDescription("Get a minecraft player/server info.")
        .addSubcommand(subcommand =>
			subcommand
				.setName("player")
				.setDescription("Get minecraft player info.")
				.addStringOption(option =>
					option.setName("user").setDescription("The Player username/uuid").setRequired(true)
				),
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("server")
				.setDescription("Get minecraft server info.")
				.addStringOption(option =>
					option.setName("address").setDescription("The minecraft server ip address.").setRequired(true)
				),
		),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            if (!argument[1]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Missing type of subcommand`).setColor(`Red`)] })
            const subcommand = argument[0];
            if (subcommand === "player") {
                const player = argument.slice(1).join(" ").trim();
                fetch("https://api.mojang.com/profiles/minecraft", { method: "POST", body: JSON.stringify([player]), headers: { 'Content-Type': 'application/json' }}).then(res => res.json()).then(json => {
                    if (json["error"]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You sent an invaild minecraft player or an error has occured.`).setColor(`Red`)] })
                    const name = json[0]["name"]
                    const id = json[0]["id"]
                    message.channel.send({ embeds: [new EmbedBuilder().setThumbnail(`https://mineskin.eu/helm/${player}/100`).setDescription(`Username: **${name}**\nId: \`${id}\``).setColor(`Blue`)] })
                })
            } else if (subcommand === "server") {
                const server = argument.slice(1).join(" ").trim();
                fetch(`https://api.mcsrvstat.us/2/${server}`).then(res => res.json()).then(json => {
                    if (json["debug"]["srv"] === false) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You sent an invaild server ip address.`).setColor(`Red`)] })
                    const serverip = json["ip"]
                    const port = json["port"]
                    const onlinemode = json["online"]
                    const playermodule = json["players"]
                    const onlineplayers = playermodule["online"]
                    const maxplayer = playermodule["max"]
                    const hostname = json["hostname"]
                    //const icon = new Image();
                    //icon.src = json["icon"];

                    message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Ip Address: ${serverip}\nPort: ${port}\nHostname: ${hostname}\nOnline Mode: ${onlinemode}\nPlaying: ${onlineplayers}\nMax Player: ${maxplayer}\nStats: ${onlineplayers}/${maxplayer}`).setColor(`Blue`)] })
                })
            }
        } else if (typeofcommand === "interaction"){
            if (message.options.getSubcommand() === "player") {
                const player = message.options.getString("user");
                if (!player) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Missing type of subcommand`).setColor(`Red`)] })
                fetch("https://api.mojang.com/profiles/minecraft", { method: "POST", body: JSON.stringify([player]), headers: { 'Content-Type': 'application/json' }}).then(res => res.json()).then(json => {
                    if (json["error"]) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You sent an invaild minecraft player or an error has occured.`).setColor(`Red`)] })
                    const name = json[0]["name"]
                    const id = json[0]["id"]
                    message.reply({ embeds: [new EmbedBuilder().setThumbnail(`https://mineskin.eu/helm/${player}/100`).setDescription(`Username: **${name}**\nId: \`${id}\``).setColor(`Blue`)] })
                })
            } else if (message.options.getSubcommand() === "server") {
                const server = message.options.getString("address");
                fetch(`https://api.mcsrvstat.us/2/${server}`).then(res => res.json()).then(json => {
                    if (json["debug"]["srv"] === false) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You sent an invaild server ip address.`).setColor(`Red`)] })
                    const serverip = json["ip"]
                    const port = json["port"]
                    const onlinemode = json["online"]
                    const playermodule = json["players"]
                    const onlineplayers = playermodule["online"]
                    const maxplayer = playermodule["max"]
                    const hostname = json["hostname"]
                    //const icon = new Image();
                    //icon.src = json["icon"];

                    message.reply({ embeds: [new EmbedBuilder().setDescription(`Ip Address: ${serverip}\nPort: ${port}\nHostname: ${hostname}\nOnline Mode: ${onlinemode}\nPlaying: ${onlineplayers}\nMax Player: ${maxplayer}\nStats: ${onlineplayers}/${maxplayer}`).setColor(`Blue`)] })
                })
            }
        }
    }
}