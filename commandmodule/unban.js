const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("unban")
		.setDescription("Unban someone from the server!")
        .addMentionableOption(option =>
            option.setName("userid").setDescription("User to unban").setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason").setDescription("Reason why you unban this user").setRequired(false)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            if (!argument[0]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild User!`).setColor(`Red`)] })
            const mentioneduser = argument[0]
            if (!mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild User!`).setColor(`Red`)] })
            if (!message.member.permissions.has("BanMembers") && !message.member.permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to use this command!`).setColor(`Red`)] });
            if (message.member.user.id === mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't unban yourself!`).setColor(`Red`)] })

            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Unbanned user ${ "<@" + mentioneduser + ">"}.`).setColor(`Green`)] })
            message.guild.members.unban(mentioneduser, argument[1]).catch(err => {message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> I can't unban this user`).setColor(`Red`)] })})
        } else if (typeofcommand === "interaction"){
            const mentioneduser = interaction.options.getString("userid")
            if (!mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild User!`).setColor(`Red`)] })
            if (!interaction.guild.members.cache.find(user => interaction.user.id).permissions.has("BanMembers") && !interaction.guild.members.cache.find(user => interaction.user.id).permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to use this command!`).setColor(`Red`)] });
            if (interaction.guild.members.cache.find(user => interaction.user.id).user.id === mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't unban yourself!`).setColor(`Red`)] })

            message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Unbanned user ${ "<@" + mentioneduser + ">"}.`).setColor(`Green`)] })
            message.guild.members.unban(mentioneduser, interaction.options.getString("reason")).catch(err => {message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> I can't unban this user`).setColor(`Red`)] })})
        }
    }
}
