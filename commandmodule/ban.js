module.exports = {
    name: 'Ban',
    description: "Ban someone from the server!",
    execute(argument, message, EmbedBuilder) {
        if (messagetype === "interaction") {
            if (!argument[0]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild User!`).setColor(`Red`)] })
            const mentioneduser = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0])
            if (!mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild User!`).setColor(`Red`)] })
            if (!argument[1]) argument[1] = "No reason given."
            if (!message.member.permissions.has("BanMembers") && !message.member.permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to ban!`).setColor(`Red`)] })
            //if (!message) return message.channel.send("I don't have permission to ban people please enable it!")
            if (message.member === mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't ban yourself!`).setColor(`Red`)] })
            if (!mentioneduser.bannable) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't ban the owner and moderator!`).setColor(`Red`)] })

            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`:white_check_mark: Banned user ${mentioneduser} for ${argument[1]}.`).setColor(`Green`)] })
            mentioneduser.ban({ reason: `${argument[1]}` }).catch(err => {message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> ERORR: #length2`).setColor(`Red`)] })})
        }else {
            if (!argument[0]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild User!`).setColor(`Red`)] })
            const mentioneduser = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0])
            if (!mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild User!`).setColor(`Red`)] })
            if (!argument[1]) argument[1] = "No reason given."
            if (!message.member.permissions.has("BanMembers") && !message.member.permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to ban!`).setColor(`Red`)] })
            //if (!message) return message.channel.send("I don't have permission to ban people please enable it!")
            if (message.member === mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't ban yourself!`).setColor(`Red`)] })
            if (!mentioneduser.bannable) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't ban the owner and moderator!`).setColor(`Red`)] })

            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`:white_check_mark: Banned user ${mentioneduser} for ${argument[1]}.`).setColor(`Green`)] })
            mentioneduser.ban({ reason: `${argument[1]}` }).catch(err => {message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> ERORR: #length2`).setColor(`Red`)] })})
        }
    }
}