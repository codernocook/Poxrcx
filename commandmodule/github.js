const { SlashCommandBuilder } = require("@discordjs/builders")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const moment = require("moment");

module.exports = {
    data: new SlashCommandBuilder()
		.setName("github")
		.setDescription("Get a Github User/Repository Info.")
        .addSubcommand(subcommand =>
			subcommand
				.setName("user")
				.setDescription("Get a Github User Info.")
				.addStringOption(option =>
                    option.setName("user").setDescription("The username.").setRequired(true)
                )
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("repo")
				.setDescription("Get a Github Repository Info.")
				.addStringOption(option =>
                    option.setName("user").setDescription("The user of Repository").setRequired(true)
                )
                .addStringOption(option =>
                    option.setName("repository").setDescription("The Repository name.").setRequired(true)
                )
		),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            let subcommand = argument[0].trim();
            
            if (subcommand === "user") {
                let user = argument[1];

                if (!user) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Missing user.`).setColor(`Red`)] });
                fetch(`https://api.github.com/users/${user}`).then(res => res.json()).then(json => {
                    try {
                        if (json["message"] && json["message"].toLowerCase().trim() === "notfound") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please type a vaild github username.`).setColor(`Red`)] });

                        let LoginName = json["login"] || "None";
                        let id = json["id"] || "None";
                        let avatar_url = json["avatar_url"] || "None";
                        let url = json["html_url"] || "None";
                        let type = json["type"] || "None";
                        let site_admin = json["site_admin"] || "None";
                        let company = json["company"] || "None";
                        let location = json["location"] || "None";
                        let email = json["email"] || "None";
                        let bio = json["bio"] || "None";
                        let public_repos = json["public_repos"] || "None";
                        let public_gists = json["public_gists"] || "None";
                        let follower = json["follower"] || "None";
                        let following = json["following"] || "None";
                        let created_at = json["created_at"] || "None";
                        let created_at_moment = "None";
                        if (created_at !== "None") {
                            created_at_moment = moment(new Date(json["created_at"]).getTime()).fromNow();
                        }
                        let updated_at = json["updated_at"]  || "None";
                        let updated_at_moment = "None";
                        if (updated_at !== "None") {
                            updated_at_moment = moment(new Date(json["updated_at"]).getTime()).fromNow();
                        }

                        message.channel.send({ embeds: [new EmbedBuilder().setThumbnail(avatar_url).setTitle(LoginName).setDescription(`Login name: ${LoginName}\nId: ${id}\nType: ${type}\nAdmin: ${site_admin}\nPublic repository: ${public_repos}\nPublic gist: ${public_gists}\nFollower: ${follower}\nFollowing: ${following}\nCompany: ${company}\nLocation: ${location}\nEmail: ${email}\nBio: \`${bio}\`\nProfile: **[${LoginName}](${url})**\nCreated at: ${created_at_moment} | ${created_at}\nUpdated at: ${updated_at_moment} | ${updated_at}`).setColor(`Blue`)] });
                    } catch {
                        message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Something went wrong with this command or a user.`).setColor(`Red`)] });
                    }
                })
            } else if (subcommand === "repo") {
                let user = argument[1];
                let repository = argument[2];

                if (!user) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Missing username of the repository you want to find.`).setColor(`Red`)] });
                if (!repository) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Missing the repository name.`).setColor(`Red`)] });

                fetch(`https://api.github.com/repos/${user}/${repository}`).then(res => res.json()).then(json => {
                    if (json["message"] && json["message"] === "Not Found") {
                        return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> I can't find the user or repository requested!`).setColor(`Red`)] });
                    } else {
                        let ProjectAuthor = json.owner.login;
                        let ProjectAuthorAvatar = json.owner.avatar_url;
                        let ProjectName = json.name;
                        let MostLanguage = json.language;
                        let Watchers = json.watchers;
                        let OpenIssues = json.open_issues_count;
                        let Visibility = json.visibility;
                        function Archived() {
                            if (json.archived === false) {
                                return "false";
                            } else if (json.archived === true) {
                                return "true";
                            }
                        }

                        message.channel.send({ embeds: [new EmbedBuilder().setThumbnail(ProjectAuthorAvatar).setTitle(ProjectAuthor).setDescription(`Repository Name: ${ProjectName}\nWatchers: ${Watchers}\nOpen Issues: ${OpenIssues}\nMost Language: ${MostLanguage}\nVisibility: ${Visibility}\nArchived: ${Archived()}`).setColor(`Blue`)] });
                    }
                })
            }
        } else if (typeofcommand === "interaction"){
            let subcommand = message.options.getSubcommand();

            if (subcommand === "user") {
                let user = message.options.getString("user");

                if (!user) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Missing user.`).setColor(`Red`)] });
                fetch(`https://api.github.com/users/${user}`).then(res => res.json()).then(json => {
                    try {
                        if (json["message"] && json["message"].toLowerCase().trim() === "notfound") return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please type a vaild github username.`).setColor(`Red`)] });

                        let LoginName = json["login"] || "None";
                        let id = json["id"] || "None";
                        let avatar_url = json["avatar_url"] || "None";
                        let url = json["html_url"] || "None";
                        let type = json["type"] || "None";
                        let site_admin = json["site_admin"] || "None";
                        let company = json["company"] || "None";
                        let location = json["location"] || "None";
                        let email = json["email"] || "None";
                        let bio = json["bio"] || "None";
                        let public_repos = json["public_repos"] || "None";
                        let public_gists = json["public_gists"] || "None";
                        let follower = json["follower"] || "None";
                        let following = json["following"] || "None";
                        let created_at = json["created_at"] || "None";
                        let created_at_moment = "None";
                        if (created_at !== "None") {
                            created_at_moment = moment(new Date(json["created_at"]).getTime()).fromNow();
                        }
                        let updated_at = json["updated_at"]  || "None";
                        let updated_at_moment = "None";
                        if (updated_at !== "None") {
                            updated_at_moment = moment(new Date(json["updated_at"]).getTime()).fromNow();
                        }

                        message.reply({ embeds: [new EmbedBuilder().setThumbnail(avatar_url).setTitle(LoginName).setDescription(`Login name: ${LoginName}\nId: ${id}\nType: ${type}\nAdmin: ${site_admin}\nPublic repository: ${public_repos}\nPublic gist: ${public_gists}\nFollower: ${follower}\nFollowing: ${following}\nCompany: ${company}\nLocation: ${location}\nEmail: ${email}\nBio: \`${bio}\`\nProfile: **[${LoginName}](${url})**\nCreated at: ${created_at_moment} | ${created_at}\nUpdated at: ${updated_at_moment} | ${updated_at}`).setColor(`Blue`)] });
                    } catch {
                        message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Something went wrong with this command or a user.`).setColor(`Red`)] });
                    }
                })
            } else if (subcommand === "repo") {
                let user = message.options.getString("user");
                let repository = message.options.getString("repository");
                
                if (!user) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Missing username of the repository you want to find.`).setColor(`Red`)] });
                if (!repository) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Missing the repository name.`).setColor(`Red`)] });
    
                fetch(`https://api.github.com/repos/${user}/${repository}`).then(res => res.json()).then(json => {
                    if (json["message"] && json["message"] === "Not Found") {
                        return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> I can't find the user or repository requested!`).setColor(`Red`)] });
                    } else {
                        let ProjectAuthor = json.owner.login;
                        let ProjectAuthorAvatar = json.owner.avatar_url;
                        let ProjectName = json.name;
                        let MostLanguage = json.language;
                        let Watchers = json.watchers;
                        let OpenIssues = json.open_issues_count;
                        let Visibility = json.visibility;
                        function Archived() {
                            if (json.archived === false) {
                                return "false";
                            } else if (json.archived === true) {
                                return "true";
                            }
                        }
        
                        message.reply({ embeds: [new EmbedBuilder().setThumbnail(ProjectAuthorAvatar).setTitle(ProjectAuthor).setDescription(`Repository Name: ${ProjectName}\nWatchers: ${Watchers}\nOpen Issues: ${OpenIssues}\nMost Language: ${MostLanguage}\nVisibility: ${Visibility}\nArchived: ${Archived()}`).setColor(`Blue`)] });
                    }
                })
            }
        }
    }
}