const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("unban")
		.setDescription("Unban someone from the server!")
        .addStringOption(option =>
            option.setName("userid").setDescription("Convert userid to unban").setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason").setDescription("Reason why you unban this user").setRequired(false)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            const mentioneduser = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0]);
            if (!mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid User!`).setColor(`Red`)] })
            if (!message.member.permissions.has("BanMembers") && !message.member.permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to use this command!`).setColor(`Red`)] });
            if (message.member.user.id === mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't unban yourself!`).setColor(`Red`)] })

            const mentioneduserposition = mentioneduser.roles.highest.position
            const authorsendposition = message.member.roles.highest.position
            const botMember = message.guild.members.cache.get(client.user.id);
            const botPermissions = new client.Permissions(botMember.permissions.bitfield);
            const botPosition = botMember.roles.highest.position;
    
            if (mentioneduserposition > authorsendposition) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> That user is a moderator, I can't do that.`).setColor(`Red`)] })
            if (!botPermissions.has("BanMembers")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] });
            if (botPosition <= mentioneduserposition) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] })

            let reason = argument.slice(2).join(" ") || 'No reason given.'
            if (!reason) reason = 'No reason given.'
            if (reason.trim() === "") {
                reason = 'No reason given.'
            }

            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Unbanned user ${ "<@" + mentioneduser + ">"} for **${reason}**`).setColor(`Green`)] })
            message.guild.members.unban(mentioneduser, reason).catch(err => {message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> I can't unban this user`).setColor(`Red`)] })})
        } else if (typeofcommand === "interaction"){
            const mentioneduser = message.options.getString("userid");
            if (!mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid User!`).setColor(`Red`)] })
            if (!message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("BanMembers") && !message.guild.members.cache.find(user => message.user.id).permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to use this command!`).setColor(`Red`)] });
            if (message.guild.members.cache.find(user => message.user.id === user.id).user.id === mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't unban yourself!`).setColor(`Red`)] })

            const mentioneduserposition = mentioneduser.roles.highest.position
            const authorsendposition = message.member.roles.highest.position
            const botMember = message.guild.members.cache.get(client.user.id);
            const botPermissions = new client.Permissions(botMember.permissions.bitfield);
            const botPosition = botMember.roles.highest.position;

            if (mentioneduserposition > authorsendposition) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> That user is a moderator, I can't do that.`).setColor(`Red`)] })
            if (!botPermissions.has("BanMembers")) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] });
            if (botPosition <= mentioneduserposition) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] })
            
            let reason = message.options.getString("reason") || 'No reason given.'
            if (!reason) reason = 'No reason given.'
            if (reason.trim() === "") {
                reason = 'No reason given.'
            }

            message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Unbanned user ${ "<@" + mentioneduser + ">"} for **${reason}**`).setColor(`Green`)] })
            message.guild.members.unban(mentioneduser, message.options.getString("reason")).catch(err => {message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> I can't unban this user`).setColor(`Red`)] })})
        }
    }
}
