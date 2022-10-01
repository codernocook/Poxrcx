module.exports = {
    name: 'Ban',
    description: "Ban player out of the server!",
    execute(argument, message, EmbedBuilder) {
        if (!argument[0]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Invaild User!`).setColor(`Red`)] })
            const mentioneduser = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0])
            if (!mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Invaild User!`).setColor(`Red`)] })
            if (!message.member.permissions.has("BanMembers") && !message.member.permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`You don't have permission to ban!`).setColor(`Red`)] })
            //if (!message) return message.channel.send("I don't have permission to ban people please enable it!")
            if (message.member === mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`You can't ban yourself!`).setColor(`Red`)] })
            if (!mentioneduser.bannable) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`You can't ban the owner and moderator!`).setColor(`Red`)] })

            let reason = argument.slice(1).join(" ") || 'No reason given.'

            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Kicked user ${mentioneduser} for ${argument[1]}, length ${argument[2]}.`).setColor(`Green`)] })
            mentioneduser.ban()(argument[1]).catch(err => {message.channel.send({ embeds: [new EmbedBuilder().setDescription(`ERORR: #length2`).setColor(`Red`)] })})
    }
}