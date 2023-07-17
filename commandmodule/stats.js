const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("stats")
		.setDescription("Show the server stat."),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            function banner_url() {
                if (message.guild.bannerURL() !== null) {
                    return `**[Image](${message.guild.bannerURL()})**`;
                } else if (message.guild.bannerURL() === null) {
                    return "No";
                }
            }
            message.channel.send({ embeds: [new EmbedBuilder().setThumbnail(message.guild.iconURL({ "extension": "webp", "forceStatic": false, "size": 128 })).setDescription(`**Server Name**: ${message.guild.name}\nOwner: <@${message.guild.ownerId}>\nMember(s): ${message.guild.memberCount}\nCreated at: ${new Date(message.guild.createdTimestamp).getDay()}/${new Date(message.guild.createdTimestamp).getMonth()}/${new Date(message.guild.createdTimestamp).getFullYear()} (dd/mm/yyyy)\nCreated at (System Time): ${message.guild.createdAt}\nBanner (url): ${banner_url()}\nNSFW Level: ${message.guild.nsfwLevel}\nVerify: ${message.guild.verified}\nDiscord Partner: ${message.guild.partnered}`).setColor(`Blue`)] });
        } else if (typeofcommand === "interaction"){
            function banner_url() {
                if (message.guild.bannerURL() !== null) {
                    return `**[Image](${message.guild.bannerURL()})**`;
                } else if (message.guild.bannerURL() === null) {
                    return "No";
                }
            }
            message.editReply({ embeds: [new EmbedBuilder().setThumbnail(message.guild.iconURL({ "extension": "webp", "forceStatic": false, "size": 128 })).setDescription(`**Server Name**: ${message.guild.name}\nOwner: <@${message.guild.ownerId}>\nMember(s): ${message.guild.memberCount}\nCreated at: ${new Date(message.guild.createdTimestamp).getDay()}/${new Date(message.guild.createdTimestamp).getMonth()}/${new Date(message.guild.createdTimestamp).getFullYear()} (dd/mm/yyyy)\nCreated at (System Time): ${message.guild.createdAt}\nBanner (url): ${banner_url()}\nNSFW Level: ${message.guild.nsfwLevel}\nVerify: ${message.guild.verified}\nDiscord Partner: ${message.guild.partnered}`).setColor(`Blue`)] });
        }
    }
}