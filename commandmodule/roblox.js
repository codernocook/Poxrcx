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
            if (!infomation) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid Roblox User!`).setColor(`Red`)] });
            infomation = infomation?.toString().trim();
            if (commandcalltype === "user") {
                fetch(`https://users.roblox.com/v1/usernames/users`, { method: "POST", body: JSON.stringify({ "usernames": [infomation], "excludeBannedUsers": false }), headers: { 'Content-Type': 'application/json' } }).then(res => Promise.all([res.status, res.json()])).then(async ([status_1, json]) => {
                    if (!json) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't fetch user profile, maybe api cooldown.`).setColor(`Red`)] });
                    if (status_1 === 500) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't fetch user profile, Api cooldown.`).setColor(`Red`)] }); // prevent Roblox downtime joke
                    
                    let UserId = undefined;

                    if (json["data"][0]["id"]) {
                        UserId = json["data"][0]["id"];
                    } else if (!json["data"][0]["id"] && UserId === undefined) {
                        UserId = null
                    }

                    fetch(`https://users.roblox.com/v1/users/${UserId}`).then(resinfo => resinfo.json()).then(async jsoninfo => {
                        if (UserId === null) {
                            await fetch(`https://users.roblox.com/v1/users/${infomation}`).then(res => Promise.all([res.status, res.json()])).then(([status_1, refetch]) => {
                                if (refetch && refetch["errors"]) {
                                    // user are trying to do something illegal lol
                                UserId = null
                                } else if (refetch && !refetch["errors"]) {
                                    UserId = refetch["id"]
                                }
                            })
                            if (UserId === null) {
                                return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid Roblox user!\n"${infomation}"\n${UserId}`).setColor(`Red`)] });
                            }
                        }
                        fetch(`https://presence.roblox.com/v1/presence/last-online`, { method: "POST", body: JSON.stringify({ "userIds": [UserId] }), headers: { 'Content-Type': 'application/json' }}).then(resonline => resonline.json()).then(jsononline => {
                            if (jsononline["lastOnlineTimestamps"]) {
                                if (!jsononline["lastOnlineTimestamps"][0]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid Roblox user!`).setColor(`Red`)] });
                                if (!jsononline["lastOnlineTimestamps"][0]["userId"] || !jsononline["lastOnlineTimestamps"][0]["lastOnline"]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid Roblox user!`).setColor(`Red`)] });
                                let LastOnlineMoment = moment(new Date(jsononline["lastOnlineTimestamps"][0]["lastOnline"]).getTime()).fromNow();
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
                                            function IsOnline() {
                                                if (jsononline["lastOnlineTimestamps"][0]["lastOnline"]) {
                                                    const old_time = new Date(jsononline["lastOnlineTimestamps"][0]["lastOnline"]).getTime();
                                                    const new_time = new Date().getTime();

                                                    if ((new_time - old_time) <= (60 * 1000)) {
                                                        return "Online";
                                                    } else {
                                                        return "Offline";
                                                    }
                                                } else {
                                                    return "Offline";
                                                }
                                            }
                                            message.channel.send({ embeds: [new EmbedBuilder().setTitle(`${jsoninfo["name"]}`).setThumbnail(jsavatarthumbnail.data[0].imageUrl).setDescription(`Username: ${jsoninfo["name"]}\nDisplay: ${jsoninfo.displayName}\nUserId: ${jsoninfo["id"]}\nVerify: ${Verify()}\nBan: ${Ban()}\nStatus: ${IsOnline()}\nLast Online: ${LastOnlineMoment}\nComputer time:${jsononline["lastOnlineTimestamps"][0]["lastOnline"]}\nCreated: ${new Date(jsoninfo.created).getDay()}/${new Date(jsoninfo.created).getMonth()}/${new Date(jsoninfo.created).getFullYear()}\nRoblox Profile: **[${jsoninfo["name"]}](https://www.roblox.com/users/${jsoninfo["id"]}/profile/)**`).setColor(`Blue`)] });
                                        }else {
                                            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid Roblox user!`).setColor(`Red`)] });
                                        }
                                    } else {
                                        return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid Roblox user!`).setColor(`Red`)] });
                                    }
                                })
                            } else {
                                return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid Roblox user!`).setColor(`Red`)] });
                            }
                        })
                    })
                })
            } else if (commandcalltype === "experience") {
                if (!infomation) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid gameId/universeId!`).setColor(`Red`)] });
                infomation = infomation?.toString().trim();
                fetch(`https://apis.roblox.com/universes/v1/places/${infomation}/universe`).then(res1 => res1.json()).then(jsonid => {
                    if (!jsonid) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid gameId/universeId1!`).setColor(`Red`)] });
                    if (!jsonid["universeId"]) return

                    let universeId = jsonid["universeId"];

                    if (universeId === null && jsonid["universeId"] === null) universeId = infomation;

                    fetch(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeId},0&returnPolicy=PlaceHolder&size=128x128&format=Png&isCircular=false`).then(resav => resav.json()).then(jsonthumbnail => {
                        if (!jsonthumbnail) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid gameId/universeId2!`).setColor(`Red`)] });
                        if (!jsonthumbnail["data"] || jsonthumbnail["errors"]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid gameId/universeId3!`).setColor(`Red`)] });
                        if (!jsonthumbnail["data"][0]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid gameId/universeId4!`).setColor(`Red`)] });
                        if (!jsonthumbnail["data"][0]["imageUrl"]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid gameId/universeId5!`).setColor(`Red`)] });

                        fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`).then(res => res.json()).then(json => {
                            let jsondata = json.data[0];
    
                            if (jsondata && !jsondata["errors"] && jsondata["name"] !== undefined && jsondata["description"] !== undefined) {
                                let CreateMoment = moment(new Date(jsondata.created).getTime()).fromNow()
                                let LastUpdateMoment = moment(new Date(jsondata.updated).getTime()).fromNow()

                                function getDescription() {
                                    if (jsondata["description"] !== null) {
                                        return `{\n"\`${jsondata["description"]}\`"\n}`
                                    } else if (jsondata["description"] === null) {
                                        return `**No description was provided in this experience.**`
                                    }
                                }
    
                                message.channel.send({ embeds: [new EmbedBuilder().setTitle(`${jsondata.name}`).setThumbnail(`${jsonthumbnail["data"][0]["imageUrl"] || undefined}`).setDescription(`Description: ${getDescription()}\nGameId: ${jsondata.id}\nRoot PlaceId: ${jsondata.rootPlaceId}\nCreator: ${jsondata.creator.name}\nEdit Permission: ${jsondata.copyingAllowed}\nPlaying: ${jsondata.playing}\nVisits: ${jsondata.visits}\nMax Players: ${jsondata.maxPlayers}\nCreated: ${jsondata.created} | ${CreateMoment}\nUpdate: ${jsondata.updated} | ${LastUpdateMoment}\nAllow Private Server: ${jsondata.createVipServersAllowed}\nGame Avatar: ${jsondata.universeAvatarType}\nGenre: ${jsondata.genre}\nFavorite: ${jsondata.favoritedCount}`).setColor(`Blue`)] });
                            }else {
                                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid gameId/universeId6!`).setColor(`Red`)] });
                            }
                        })
                    })
                })
            }
        } else if (typeofcommand === "interaction"){
            if (message.options.getSubcommand() === "user") {
                let infomation = message.options.getString("user");

                fetch(`https://users.roblox.com/v1/usernames/users`, { method: "POST", body: JSON.stringify({ "usernames": [infomation], "excludeBannedUsers": false }), headers: { 'Content-Type': 'application/json' } }).then(res => Promise.all([res.status, res.json()])).then(async ([status_1, json]) => {
                    if (!json) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't fetch user profile, maybe api cooldown.`).setColor(`Red`)] });
                    if (status_1 === 500) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Can't fetch user profile, Api cooldown.`).setColor(`Red`)] }); // prevent Roblox downtime joke
                    
                    let UserId = undefined;

                    if (json["data"][0]["id"]) {
                        UserId = json["data"][0]["id"];
                    } else if (!json["data"][0]["id"] && UserId === undefined) {
                        UserId = null
                    }

                    fetch(`https://users.roblox.com/v1/users/${UserId}`).then(resinfo => resinfo.json()).then(async jsoninfo => {
                        if (UserId === null) {
                            await fetch(`https://users.roblox.com/v1/users/${infomation}`).then(res => Promise.all([res.status, res.json()])).then(([status_1, refetch]) => {
                                if (refetch && refetch["errors"]) {
                                    // user are trying to do something illegal lol
                                UserId = null
                                } else if (refetch && !refetch["errors"]) {
                                    UserId = refetch["id"]
                                }
                            })
                            if (UserId === null) {
                                return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid Roblox user!\n"${infomation}"\n${UserId}`).setColor(`Red`)] });
                            }
                        }
                        fetch(`https://presence.roblox.com/v1/presence/last-online`, { method: "POST", body: JSON.stringify({ "userIds": [UserId] }), headers: { 'Content-Type': 'application/json' }}).then(resonline => resonline.json()).then(jsononline => {
                            if (jsononline["lastOnlineTimestamps"]) {
                                if (!jsononline["lastOnlineTimestamps"][0]) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid Roblox user!`).setColor(`Red`)] });
                                if (!jsononline["lastOnlineTimestamps"][0]["userId"] || !jsononline["lastOnlineTimestamps"][0]["lastOnline"]) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid Roblox user!`).setColor(`Red`)] });
                                let LastOnlineMoment = moment(new Date(jsononline["lastOnlineTimestamps"][0]["lastOnline"]).getTime()).fromNow();
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
                                            function IsOnline() {
                                                if (jsononline["lastOnlineTimestamps"][0]["lastOnline"]) {
                                                    const old_time = new Date(jsononline["lastOnlineTimestamps"][0]["lastOnline"]).getTime();
                                                    const new_time = new Date().getTime();

                                                    if ((new_time - old_time) <= (60 * 1000)) {
                                                        return "Online";
                                                    } else {
                                                        return "Offline";
                                                    }
                                                } else {
                                                    return "Offline";
                                                }
                                            }
                                            message.reply({ embeds: [new EmbedBuilder().setTitle(`${jsoninfo["name"]}`).setThumbnail(jsavatarthumbnail.data[0].imageUrl).setDescription(`Username: ${jsoninfo["name"]}\nDisplay: ${jsoninfo.displayName}\nUserId: ${jsoninfo["id"]}\nVerify: ${Verify()}\nBan: ${Ban()}\nStatus: ${IsOnline()}\nLast Online: ${LastOnlineMoment}\nComputer time:${jsononline["lastOnlineTimestamps"][0]["lastOnline"]}\nCreated: ${new Date(jsoninfo.created).getDay()}/${new Date(jsoninfo.created).getMonth()}/${new Date(jsoninfo.created).getFullYear()}\nRoblox Profile: **[${jsoninfo["name"]}](https://www.roblox.com/users/${jsoninfo["id"]}/profile/)**`).setColor(`Blue`)] });
                                        }else {
                                            message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid Roblox user!`).setColor(`Red`)] });
                                        }
                                    } else {
                                        return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid Roblox user!`).setColor(`Red`)] });
                                    }
                                })
                            } else {
                                return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid Roblox user!`).setColor(`Red`)] });
                            }
                        })
                    })
                })
            } else if (message.options.getSubcommand() === "experience") {
                let infomation = message.options.getString("universeid");
                
                if (!infomation) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid gameId/universeId!`).setColor(`Red`)] });
                infomation = infomation?.toString().trim();
                fetch(`https://apis.roblox.com/universes/v1/places/${infomation}/universe`).then(res1 => res1.json()).then(jsonid => {
                    if (!jsonid) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid gameId/universeId1!`).setColor(`Red`)] });
                    if (!jsonid["universeId"]) return

                    let universeId = jsonid["universeId"];

                    if (universeId === null && jsonid["universeId"] === null) universeId = infomation;

                    fetch(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeId},0&returnPolicy=PlaceHolder&size=128x128&format=Png&isCircular=false`).then(resav => resav.json()).then(jsonthumbnail => {
                        if (!jsonthumbnail) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid gameId/universeId2!`).setColor(`Red`)] });
                        if (!jsonthumbnail["data"] || jsonthumbnail["errors"]) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid gameId/universeId3!`).setColor(`Red`)] });
                        if (!jsonthumbnail["data"][0]) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid gameId/universeId4!`).setColor(`Red`)] });
                        if (!jsonthumbnail["data"][0]["imageUrl"]) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid gameId/universeId5!`).setColor(`Red`)] });

                        fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`).then(res => res.json()).then(json => {
                            let jsondata = json.data[0];
    
                            if (jsondata && !jsondata["errors"] && jsondata["name"] !== undefined && jsondata["description"] !== undefined) {
                                let CreateMoment = moment(new Date(jsondata.created).getTime()).fromNow()
                                let LastUpdateMoment = moment(new Date(jsondata.updated).getTime()).fromNow()

                                function getDescription() {
                                    if (jsondata["description"] !== null) {
                                        return `{\n"\`${jsondata["description"]}\`"\n}`
                                    } else if (jsondata["description"] === null) {
                                        return `**No description was provided in this experience.**`
                                    }
                                }
    
                                message.reply({ embeds: [new EmbedBuilder().setTitle(`${jsondata.name}`).setThumbnail(`${jsonthumbnail["data"][0]["imageUrl"] || undefined}`).setDescription(`Description: ${getDescription()}\nGameId: ${jsondata.id}\nRoot PlaceId: ${jsondata.rootPlaceId}\nCreator: ${jsondata.creator.name}\nEdit Permission: ${jsondata.copyingAllowed}\nPlaying: ${jsondata.playing}\nVisits: ${jsondata.visits}\nMax Players: ${jsondata.maxPlayers}\nCreated: ${jsondata.created} | ${CreateMoment}\nUpdate: ${jsondata.updated} | ${LastUpdateMoment}\nAllow Private Server: ${jsondata.createVipServersAllowed}\nGame Avatar: ${jsondata.universeAvatarType}\nGenre: ${jsondata.genre}\nFavorite: ${jsondata.favoritedCount}`).setColor(`Blue`)] });
                            }else {
                                message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid gameId/universeId6!`).setColor(`Red`)] });
                            }
                        })
                    })
                })
            }
        }
    }
}