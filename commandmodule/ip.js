const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
		.setName("ip")
		.setDescription("Show the help info!")
        .addStringOption(option =>
            option.setName("ip-address").setDescription("The ip address you want to get infomation.").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            let ip = argument.join(" ");

            if (!ip) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You need a ip address to run this command.`).setColor(`Red`)] });
            if (ip.trim() === "") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You need a ip address to run this command.`).setColor(`Red`)] });

            fetch(`http://ip-api.com/json/${ip}`).then(res => res.json()).then(json => {
                fetch(`http://ip-api.com/json/`).then(res => res.json()).then(jsoncheck => {
                    if (json) {
                        try {
                            if (json["message"] && json["message"].toLowerCase().trim() === "invalidquery") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please type a vaild ip address.`).setColor(`Red`)] });
                            if (json["status"] && json["status"] === "fail" && json["message"] && json["message"].toLowerCase().trim() !== "invalidquery") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Some thing went wrong with this command, please try again later.`).setColor(`Red`)] });
    
                            let country = json["country"] || "None";
                            let country_code = json["countryCode"] || "None";
                            let region = json["region"] || "None";
                            let region_name = json["regionName"] || "None";
                            let city = json["city"] || "None";
                            let zip = json["zip"] || "None";
                            let lat = json["lat"] || "None";
                            let lon = json["lon"] || "None";
                            let timezone = json["timezone"] || "None";
                            let isp = json["isp"] || "None";
                            let org = json["org"] || "None";
                            let query = json["query"] || "None";

                            if (jsoncheck["query"] && json["query"]) {
                                if (json["query"].trim() === jsoncheck["query"]) {
                                    return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can not view the discord bot ip address`).setColor(`Red`)] });
                                }
                            }
    
                            message.channel.send({ embeds: [new EmbedBuilder().setTitle(`Ip infomation of ${query}`).setDescription(`Country: ${country}\nCountry Code: ${country_code}\nRegion: ${region}\nRegion Name: ${region_name}\nCity: ${city}\nZip: ${zip}\nLat: ${lat}\nLon: ${lon}\nTimezone: ${timezone}\nIsp: ${isp}\nOrg: ${org}`).setColor(`Blue`)] });
                        } catch {
                            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Something went wrong with this command, please try again later.`).setColor(`Red`)] });
                        }
                    }
                })
            })
        } else if (typeofcommand === "interaction"){
            let ip = message.options.getString("ip-address");

            if (!ip) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You need a ip address to run this command.`).setColor(`Red`)] });
            if (ip.trim() === "") return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You need a ip address to run this command.`).setColor(`Red`)] });

            fetch(`http://ip-api.com/json/${ip}`).then(res => res.json()).then(json => {
                fetch(`http://ip-api.com/json/`).then(res => res.json()).then(jsoncheck => {
                    if (json) {
                        try {
                            if (json["message"] && json["message"].toLowerCase().trim() === "invalidquery") return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please type a vaild ip address.`).setColor(`Red`)] });
                            if (json["status"] && json["status"] === "fail" && json["message"] && json["message"].toLowerCase().trim() !== "invalidquery") return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Some thing went wrong with this command, please try again later.`).setColor(`Red`)] });
    
                            let country = json["country"] || "None";
                            let country_code = json["countryCode"] || "None";
                            let region = json["region"] || "None";
                            let region_name = json["regionName"] || "None";
                            let city = json["city"] || "None";
                            let zip = json["zip"] || "None";
                            let lat = json["lat"] || "None";
                            let lon = json["lon"] || "None";
                            let timezone = json["timezone"] || "None";
                            let isp = json["isp"] || "None";
                            let org = json["org"] || "None";
                            let query = json["query"] || "None";

                            if (jsoncheck["query"] && json["query"]) {
                                if (json["query"].trim() === jsoncheck["query"]) {
                                    return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can not view the discord bot ip address`).setColor(`Red`)] });
                                }
                            }
    
                            message.reply({ embeds: [new EmbedBuilder().setTitle(`Ip infomation of ${query}`).setDescription(`Country: ${country}\nCountry Code: ${country_code}\nRegion: ${region}\nRegion Name: ${region_name}\nCity: ${city}\nZip: ${zip}\nLat: ${lat}\nLon: ${lon}\nTimezone: ${timezone}\nIsp: ${isp}\nOrg: ${org}`).setColor(`Blue`)] });
                        } catch {
                            message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Something went wrong with this command, please try again later.`).setColor(`Red`)] });
                        }
                    }
                })
            })
        }
    }
}