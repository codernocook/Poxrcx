const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("Ban someone from the server!")
        .addUserOption(option =>
            option.setName("user").setDescription("User to ban").setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason").setDescription("Reason why you ban this user").setRequired(false)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            if (!argument[0]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid User!`).setColor(`Red`)] })
            const mentioneduser = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0]);
            if (!mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid User!`).setColor(`Red`)] })
            if (!message.member.permissions.has("BanMembers") && !message.member.permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to ban!`).setColor(`Red`)] })
            if (message.member === mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't ban yourself!`).setColor(`Red`)] })
            if (!mentioneduser.bannable) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't ban the owner and moderator!`).setColor(`Red`)] })

            //Check position to not abuse or exploit
            const mentioneduserposition = mentioneduser.roles.highest.position
            const authorsendposition = message.member.roles.highest.position
            const botMember = message.guild.members.cache.get(client.user.id);
            const botPermissions = new Permissions(botMember.permissions.bitfield);
            const botPosition = botMember.roles.highest.position;
    
            if (mentioneduserposition > authorsendposition) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> That user is a moderator, I can't do that.`).setColor(`Red`)] })
            if (!botPermissions.has("BanMembers")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] });
            if (botPosition <= mentioneduserposition) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] })

            // Checking if reason value is filled or not
            let reason = argument.slice(1).join(" ") || 'No reason given.'
            if (!reason) reason = 'No reason given.'
            if (reason.trim() === "") {
                reason = 'No reason given.'
            }

            // Start banning
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Banned user ${mentioneduser} for **${reason}**`).setColor(`Green`)] })
            mentioneduser.ban({ reason: `${reason}` }).catch(err => {message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> I can't ban this user, maybe my role position is too low.`).setColor(`Red`)] })})
        } else if (typeofcommand === "interaction") {
            const mentioneduser = message.guild.members.cache.find(user => message.options.getUser("user").id === user.id);
            if (!mentioneduser) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid User!`).setColor(`Red`)] })
            if (!message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("BanMembers") && !message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("Administrator")) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to ban!`).setColor(`Red`)] })
            if (message.guild.members.cache.find(user => message.user.id) === mentioneduser) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't ban yourself!`).setColor(`Red`)] })
            if (!mentioneduser.bannable) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't ban the owner and moderator!`).setColor(`Red`)] })

            //Check position to not abuse or exploit
            const mentioneduserposition = mentioneduser.roles.highest.position
            const authorsendposition = message.member.roles.highest.position
            const botMember = message.guild.members.cache.get(client.user.id);
            const botPermissions = new Permissions(botMember.permissions.bitfield);
            const botPosition = botMember.roles.highest.position;

            if (mentioneduserposition > authorsendposition) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> That user is a moderator, I can't do that.`).setColor(`Red`)] })
            if (!botPermissions.has("BanMembers")) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] });
            if (botPosition <= mentioneduserposition) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] })

            // Checking if reason value is filled or not
            let reason = message.options.getString("reason") || 'No reason given.'
            if (!reason) reason = 'No reason given.'
            if (reason.trim() === "") {
                reason = 'No reason given.'
            }
            
            // Start banning
            message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Banned user ${mentioneduser} for **${reason}**`).setColor(`Green`)] })
            mentioneduser.ban({ reason: `${reason}` }).catch(err => {message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> I can't ban this user, maybe my role position is too low.`).setColor(`Red`)] })})
        }
    }
}