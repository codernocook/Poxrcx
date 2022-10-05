const { default: parse } = require('parse-duration');

module.exports = {
    name: 'Mute',
    description: "Mute someone from the server!",
    execute(argument, message, EmbedBuilder) {
        if (!argument[0]) return  message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild user.`).setColor(`Red`)] })
        if (!argument[1]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Missing mute duration!`).setColor(`Red`)] })
            const mentioneduser = message.mentions.members.first();
            const parsetime = require('parse-duration').default;
            const mspack = require('ms');
            if (!mentioneduser) return message.channel.send("Invaild user.")
            if (!message.member.permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to mute user!`).setColor(`Red`)] })
            //if (!message.guild) return message.channel.send("I don't have permission to time out people please enable it!")
            if (message.member === mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't mute yourself.`).setColor(`Red`)] })
            if (mentioneduser.roles.highest.position > message.author.roles.highest.position) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to use this command!`).setColor(`Red`)] });

            const parsedtime = parsetime(argument[1])
            let reason = argument.slice(1).join(" ") || 'No reason given'

            if (parsedtime < mspack("1m") || parsedtime > mspack("14d")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please use vaild limit less than 14 days.`).setColor(`Red`)] });

            mentioneduser.timeout(parsedtime, reason).catch(err => { message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> I can't mute ${mentioneduser}`).setColor(`Red`)] }) });

            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> User ${mentioneduser} was muted.`).setColor(`Green`)] })
    }
}
