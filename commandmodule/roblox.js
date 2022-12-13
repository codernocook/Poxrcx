const { SlashCommandBuilder } = require("@discordjs/builders")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const moment = require("moment");

module.exports = {
    data: new SlashCommandBuilder()
		.setName("roblox")
		.setDescription("Get Roblox user/Experience Infomation by ID.")
        .addSubcommand(subcommand =>
			subcommand
				.setName("user")
				.setDescription("Get Roblox User Infomation")
				.addStringOption(option =>
					option.setName("user").setDescription("The Username or Userid of the Roblox Player").setRequired(true)
				),
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("experience")
				.setDescription("Get Roblox Experience Infomation")
				.addStringOption(option =>
					option.setName("universeid").setDescription("The universeId of the Experience").setRequired(true)
				),
		),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            const commandcalltype = argument[0]
            let infomation = argument.slice(1).join(" ");
            if (!infomation) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild Roblox User!`).setColor(`Red`)] });
            if (commandcalltype === "user") {
                if (isNaN(infomation)) {
                    fetch(`https://api.roblox.com/users/get-by-username?username=${infomation}`).then(res => res.json()).then(json => {
                    if (!json) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't fetch user profile, maybe api cooldown.`).setColor(`Red`)] });
                    if (json["errors"]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild Roblox user!`).setColor(`Red`)] });
                    let UserId = json.Id;
                        fetch(`https://users.roblox.com/v1/users/${UserId}`).then(resinfo => resinfo.json()).then(jsoninfo => {
                            fetch(`https://api.roblox.com/users/${UserId}/onlinestatus`).then(resonline => resonline.json()).then(jsononline => {
                                if (!jsononline["errors"]) {
                                    let LastOnlineMoment = moment(new Date(jsononline.LastOnline).getTime()).fromNow()
                                    fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${UserId}&size=100x100&format=Png&isCircular=false`).then(resavatarthumbnail => resavatarthumbnail.json()).then(jsavatarthumbnail => {
                                        if (!jsavatarthumbnail["errors"]) {
                                            if (!json["errors"]) {
                                                function Verify() {
                                                    if (jsoninfo.hasVerifiedBadge === false) {
                                                        return "No"
                                                    } else if (jsoninfo.hasVerifiedBadge === true) {
                                                        return "Yes"
                                                    }
                                                }
                                                function Ban() {
                                                    if (jsoninfo.isBanned === false) {
                                                        return "No"
                                                    } else if (jsoninfo.isBanned === true) {
                                                        return "Yes"
                                                    }
                                                }
                                                message.channel.send({ embeds: [new EmbedBuilder().setTitle(`${json.Username}`).setThumbnail(jsavatarthumbnail.data[0].imageUrl).setDescription(`Username: ${json.Username}\nDisplay: ${jsoninfo.displayName}\nUserId: ${json.Id}\nVerify: ${Verify()}\nBan: ${Ban()}\nStatus: ${jsononline.LastLocation}\nLast Online: ${LastOnlineMoment} | ${jsononline.LastOnline}\nCreated: ${new Date(jsoninfo.created).getDay()}/${new Date(jsoninfo.created).getMonth()}/${new Date(jsoninfo.created).getFullYear()}\nRoblox Profile: **[${json.Username}](https://www.roblox.com/users/${json.Id}/profile/)**`).setColor(`Blue`)] });
                                            }else {
                                                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild Roblox user!`).setColor(`Red`)] });
                                            }
                                        } else {
                                            return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild Roblox user!`).setColor(`Red`)] });
                                        }
                                    })
                                } else {
                                    return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild Roblox user!`).setColor(`Red`)] });
                                }
                            })
                        })
                    })
                } else {
                    fetch(`https://api.roblox.com/users/${infomation}`).then(res => res.json()).then(json => {
                    if (!json) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't fetch user profile, maybe api cooldown.`).setColor(`Red`)] });
                    if (json["errors"]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild Roblox user!`).setColor(`Red`)] });
                        fetch(`https://users.roblox.com/v1/users/${infomation}`).then(resinfo => resinfo.json()).then(jsoninfo => {
                            fetch(`https://api.roblox.com/users/${infomation}/onlinestatus`).then(resonline => resonline.json()).then(jsononline => {
                                if (!jsononline["errors"]) {
                                    let LastOnlineMoment = moment(new Date(jsononline.LastOnline).getTime()).fromNow()
                                    fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${infomation}&size=100x100&format=Png&isCircular=false`).then(resavatarthumbnail => resavatarthumbnail.json()).then(jsavatarthumbnail => {
                                        if (!jsavatarthumbnail["errors"]) {
                                            if (!json["errors"]) {
                                                function Verify() {
                                                    if (jsoninfo.hasVerifiedBadge === false) {
                                                        return "No"
                                                    } else if (jsoninfo.hasVerifiedBadge === true) {
                                                        return "Yes"
                                                    }
                                                }
                                                function Ban() {
                                                    if (jsoninfo.isBanned === false) {
                                                        return "No"
                                                    } else if (jsoninfo.isBanned === true) {
                                                        return "Yes"
                                                    }
                                                }
                                                message.channel.send({ embeds: [new EmbedBuilder().setTitle(`${json.Username}`).setThumbnail(jsavatarthumbnail.data[0].imageUrl).setDescription(`Username: ${json.Username}\nDisplay: ${jsoninfo.displayName}\nUserId: ${json.Id}\nVerify: ${Verify()}\nBan: ${Ban()}\nStatus: ${jsononline.LastLocation}\nLast Online: ${LastOnlineMoment} | ${jsononline.LastOnline}\nCreated: ${new Date(jsoninfo.created).getDay()}/${new Date(jsoninfo.created).getMonth()}/${new Date(jsoninfo.created).getFullYear()}\nRoblox Profile: **[${json.Username}](https://www.roblox.com/users/${json.Id}/profile/)**`).setColor(`Blue`)] });
                                            }else {
                                                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild Roblox user!`).setColor(`Red`)] });
                                            }
                                        } else {
                                            return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild Roblox user!`).setColor(`Red`)] });
                                        }
                                    })
                                } else {
                                    return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild Roblox user!`).setColor(`Red`)] });
                                }
                            })
                        })
                    })
                }
            } else if (commandcalltype === "experience") {
                if (!infomation) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild universeId!`).setColor(`Red`)] });
                fetch(`https://games.roblox.com/v1/games?universeIds=${infomation}`).then(res => res.json()).then(json => {
                    let jsondata = json.data[0];

                    if (jsondata && !jsondata["errors"] && jsondata["name"] && jsondata["description"]) {
                        let CreateMoment = moment(new Date(jsondata.created).getTime()).fromNow()
                        let LastUpdateMoment = moment(new Date(jsondata.updated).getTime()).fromNow()

                        message.channel.send({ embeds: [new EmbedBuilder().setTitle(`${jsondata.name}`).setDescription(`Description: \`${jsondata.description}\`\nCreator: ${jsondata.creator.name}\nEdit Permission: ${jsondata.copyingAllowed}\nPlaying: ${jsondata.playing}\nVisits: ${jsondata.visits}\nMax Players: ${jsondata.maxPlayers}\nCreated: ${jsondata.created} | ${CreateMoment}\nUpdate: ${jsondata.updated} | ${LastUpdateMoment}\nAllow Private Server: ${jsondata.createVipServersAllowed}\nGame Avatar: ${jsondata.universeAvatarType}\nGenre: ${jsondata.genre}\nFavorite: ${jsondata.favoritedCount}`).setColor(`Blue`)] });
                    }else {
                        message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild universeId!`).setColor(`Red`)] });
                    }
                })
            }
        } else if (typeofcommand === "interaction"){
            if (message.options.getSubcommand() === "user") {
                let infomation = message.options.getString("user")
                if (isNaN(infomation)) {
                    fetch(`https://api.roblox.com/users/get-by-username?username=${infomation}`).then(res => res.json()).then(json => {
                    if (!json) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't fetch user profile, maybe api cooldown.`).setColor(`Red`)] });
                    if (json["errors"]) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild Roblox user!`).setColor(`Red`)] });
                    let UserId = json.Id;
                        fetch(`https://users.roblox.com/v1/users/${UserId}`).then(resinfo => resinfo.json()).then(jsoninfo => {
                            fetch(`https://api.roblox.com/users/${UserId}/onlinestatus`).then(resonline => resonline.json()).then(jsononline => {
                                if (!jsononline["errors"]) {
                                    let LastOnlineMoment = moment(new Date(jsononline.LastOnline).getTime()).fromNow()
                                    fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${UserId}&size=100x100&format=Png&isCircular=false`).then(resavatarthumbnail => resavatarthumbnail.json()).then(jsavatarthumbnail => {
                                        if (!jsavatarthumbnail["errors"]) {
                                            if (!json["errors"]) {
                                                function Verify() {
                                                    if (jsoninfo.hasVerifiedBadge === false) {
                                                        return "No"
                                                    } else if (jsoninfo.hasVerifiedBadge === true) {
                                                        return "Yes"
                                                    }
                                                }
                                                function Ban() {
                                                    if (jsoninfo.isBanned === false) {
                                                        return "No"
                                                    } else if (jsoninfo.isBanned === true) {
                                                        return "Yes"
                                                    }
                                                }
                                                message.reply({ embeds: [new EmbedBuilder().setTitle(`${json.Username}`).setThumbnail(jsavatarthumbnail.data[0].imageUrl).setDescription(`Username: ${json.Username}\nDisplay: ${jsoninfo.displayName}\nUserId: ${json.Id}\nVerify: ${Verify()}\nBan: ${Ban()}\nStatus: ${jsononline.LastLocation}\nLast Online: ${LastOnlineMoment} | ${jsononline.LastOnline}\nCreated: ${new Date(jsoninfo.created).getDay()}/${new Date(jsoninfo.created).getMonth()}/${new Date(jsoninfo.created).getFullYear()}\nRoblox Profile: **[${json.Username}](https://www.roblox.com/users/${json.Id}/profile/)**`).setColor(`Blue`)] });
                                            }else {
                                                message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild Roblox user!`).setColor(`Red`)] });
                                            }
                                        } else {
                                            return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild Roblox user!`).setColor(`Red`)] });
                                        }
                                    })
                                } else {
                                    return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild Roblox user!`).setColor(`Red`)] });
                                }
                            })
                        })
                    })
                } else {
                    fetch(`https://api.roblox.com/users/${infomation}`).then(res => res.json()).then(json => {
                    if (!json) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't fetch user profile, maybe api cooldown.`).setColor(`Red`)] });
                    if (json["errors"]) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild Roblox user!`).setColor(`Red`)] });
                        fetch(`https://users.roblox.com/v1/users/${infomation}`).then(resinfo => resinfo.json()).then(jsoninfo => {
                            fetch(`https://api.roblox.com/users/${infomation}/onlinestatus`).then(resonline => resonline.json()).then(jsononline => {
                                if (!jsononline["errors"]) {
                                    let LastOnlineMoment = moment(new Date(jsononline.LastOnline).getTime()).fromNow()
                                    fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${infomation}&size=100x100&format=Png&isCircular=false`).then(resavatarthumbnail => resavatarthumbnail.json()).then(jsavatarthumbnail => {
                                        if (!jsavatarthumbnail["errors"]) {
                                            if (!json["errors"]) {
                                                function Verify() {
                                                    if (jsoninfo.hasVerifiedBadge === false) {
                                                        return "No"
                                                    } else if (jsoninfo.hasVerifiedBadge === true) {
                                                        return "Yes"
                                                    }
                                                }
                                                function Ban() {
                                                    if (jsoninfo.isBanned === false) {
                                                        return "No"
                                                    } else if (jsoninfo.isBanned === true) {
                                                        return "Yes"
                                                    }
                                                }
                                                message.reply({ embeds: [new EmbedBuilder().setTitle(`${json.Username}`).setThumbnail(jsavatarthumbnail.data[0].imageUrl).setDescription(`Username: ${json.Username}\nDisplay: ${jsoninfo.displayName}\nUserId: ${json.Id}\nVerify: ${Verify()}\nBan: ${Ban()}\nStatus: ${jsononline.LastLocation}\nLast Online: ${LastOnlineMoment} | ${jsononline.LastOnline}\nCreated: ${new Date(jsoninfo.created).getDay()}/${new Date(jsoninfo.created).getMonth()}/${new Date(jsoninfo.created).getFullYear()}\nRoblox Profile: **[${json.Username}](https://www.roblox.com/users/${json.Id}/profile/)**`).setColor(`Blue`)] });
                                            }else {
                                                message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild Roblox user!`).setColor(`Red`)] });
                                            }
                                        } else {
                                            return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild Roblox user!`).setColor(`Red`)] });
                                        }
                                    })
                                } else {
                                    return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild Roblox user!`).setColor(`Red`)] });
                                }
                            })
                        })
                    })
                }
            } else if (message.options.getSubcommand() === "experience") {
                let infomation = message.options.getString("universeid")
                fetch(`https://games.roblox.com/v1/games?universeIds=${infomation}`).then(res => res.json()).then(json => {
                    let jsondata = json.data[0];
                    let CreateMoment = moment(new Date(jsondata.created).getTime()).fromNow()
                    let LastUpdateMoment = moment(new Date(jsondata.updated).getTime()).fromNow()

                    if (jsondata && !jsondata["errors"] && jsondata["name"] && jsondata["description"]) {
                        message.reply({ embeds: [new EmbedBuilder().setTitle(`${jsondata.name}`).setDescription(`Description: \`${jsondata.description}\`\nCreator: ${jsondata.creator.name}\nEdit Permission: ${jsondata.copyingAllowed}\nPlaying: ${jsondata.playing}\nVisits: ${jsondata.visits}\nMax Players: ${jsondata.maxPlayers}\nCreated: ${jsondata.created} | ${CreateMoment}\nUpdate: ${jsondata.updated} | ${LastUpdateMoment}\nAllow Private Server: ${jsondata.createVipServersAllowed}\nGame Avatar: ${jsondata.universeAvatarType}\nGenre: ${jsondata.genre}\nFavorite: ${jsondata.favoritedCount}`).setColor(`Blue`)] });
                    }else {
                        message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild universeId!`).setColor(`Red`)] });
                    }
                })
            }
        }
    }
}
