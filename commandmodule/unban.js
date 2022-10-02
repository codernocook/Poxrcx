module.exports = {
    name: 'Unban',
    description: "Unban someone from the server!",
    execute(argument, message, EmbedBuilder) {
        if (!argument[0]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild User!`).setColor(`Red`)] })
            const mentioneduser = argument[0]
            if (!mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild User!`).setColor(`Red`)] })
            if (!argument[1]) argument[1] = "";
            if (!message.member.permissions.has("BanMembers") && !message.member.permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to unban!`).setColor(`Red`)] })
            //if (!message) return message.channel.send("I don't have permission to ban people please enable it!")
            if (message.member.user.id === mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't unban yourself!`).setColor(`Red`)] })

            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`:white_check_mark: Unbanned user ${ "<@" + mentioneduser + ">"}.`).setColor(`Green`)] })
            message.guild.members.unban(mentioneduser, argument[1]).catch(err => {message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> ERORR: #length2`).setColor(`Red`)] })})
    }
}