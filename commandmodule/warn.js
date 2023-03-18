const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("warn")
		.setDescription("Send user a warning.")
        .addUserOption(option =>
            option.setName("user").setDescription("User to warn").setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason").setDescription("Reason why you warn this user").setRequired(false)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            if (!argument[0]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid User!`).setColor(`Red`)] })
            const mentioneduser = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0]);
            if (!mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid User!`).setColor(`Red`)] })
            if (!message.member.permissions.has("ManageMessages") || !message.member.permissions.has("ManageChannels") || !message.member.permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to warn a user!`).setColor(`Red`)] })
            if (message.member === mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't warn yourself!`).setColor(`Red`)] })
            if (!mentioneduser.bannable || !mentioneduser.kickable) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't warn the owner and moderator!`).setColor(`Red`)] })

            //Check position to not abuse or exploit
            const mentioneduserposition = mentioneduser.roles.highest.position
            const authorsendposition = message.member.roles.highest.position
            const botMember = message.guild.members.cache.get(client.user.id);
            const botPermissions = new client.Permissions(botMember.permissions.bitfield);
            const botPosition = botMember.roles.highest.position;
    
            if (mentioneduserposition > authorsendposition) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> That user is a moderator, I can't do that.`).setColor(`Red`)] })
            if (!botPermissions.has("BanMembers")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] });
            if (botPosition <= mentioneduserposition) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] })

            // Checking if reason value is filled or not
            let reason = argument.slice(1).join(" ") || 'No reason given.'
            // Start warning
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Sent user ${mentioneduser} a warn for **${reason}**`).setColor(`Green`)] })
            mentioneduser.send({ embeds: [new EmbedBuilder().setDescription(`You were **warned** in ${message.guild.name} for **${reason}**`).setColor(`Green`)] }).catch(err => {message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> This user has their DMS off.`).setColor(`Red`)] })})
        } else if (typeofcommand === "interaction"){
            const mentioneduser = message.guild.members.cache.find(user => message.options.getUser("user").id === user.id);
            if (!mentioneduser) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid User!`).setColor(`Red`)] })
            if (!message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("ManageMessages") || !message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("ManageChannels") || !message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("Administrator")) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to warn a user!`).setColor(`Red`)] })
            if (message.guild.members.cache.find(user => message.user.id) === mentioneduser) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't warn yourself!`).setColor(`Red`)] })
            if (!mentioneduser.bannable) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't warn the owner and moderator!`).setColor(`Red`)] })

            //Check position to not abuse or exploit
            const mentioneduserposition = mentioneduser.roles.highest.position
            const authorsendposition = message.member.roles.highest.position
            const botMember = message.guild.members.cache.get(client.user.id);
            const botPermissions = new client.Permissions(botMember.permissions.bitfield);
            const botPosition = botMember.roles.highest.position;

            if (mentioneduserposition > authorsendposition) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> That user is a moderator, I can't do that.`).setColor(`Red`)] })
            if (!botPermissions.has("BanMembers")) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] });
            if (botPosition <= mentioneduserposition) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] })

            // Checking if reason value is filled or not
            let reason = message.options.getString("reason") || 'No reason given.'
            // Start warning
            message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Sent user ${mentioneduser} a warn for **${reason}**`).setColor(`Green`)] })
            mentioneduser.send({ embeds: [new EmbedBuilder().setDescription(`You were **warned** in ${message.guild.name} for **${reason}**`).setColor(`Green`)] }).catch(err => {message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> This user has their DMS off.`).setColor(`Red`)] })})
        }
    }
}