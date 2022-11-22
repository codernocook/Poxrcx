const { SlashCommandBuilder } = require("@discordjs/builders")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
		.setName("github")
		.setDescription("Get a Github Repository Info")
        .addStringOption(option =>
            option.setName("user").setDescription("The user of Repository").setRequired(true)
        )
        .addStringOption(option =>
            option.setName("repository").setDescription("The Repository name!").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
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
                    let Archived = json.archived;
                    let OpenIssues = json.open_issues_count;
                    let Visibility = json.visibility;

                    message.channel.send({ embeds: [new EmbedBuilder().setThumbnail(ProjectAuthorAvatar).setTitle(ProjectAuthor).setDescription(`Repository Name: ${ProjectName}\nWatchers: ${Watchers}\nOpen Issues: ${OpenIssues}\nMost Language: ${MostLanguage}\nVisibility: ${Visibility}\nArchived: ${toString(Archived)}`).setColor(`Red`)] });
                }
            })
        } else if (typeofcommand === "interaction"){
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
                    let Archived = json.archived;
                    let OpenIssues = json.open_issues_count;
                    let Visibility = json.visibility;
    
                    message.reply({ embeds: [new EmbedBuilder().setThumbnail(ProjectAuthorAvatar).setTitle(ProjectAuthor).setDescription(`Repository Name: ${ProjectName}\nWatchers: ${Watchers}\nOpen Issues: ${OpenIssues}\nMost Language: ${MostLanguage}\nVisibility: ${Visibility}\nArchived: ${toString(Archived)}`).setColor(`Red`)] });
                }
            })
        }
    }
}