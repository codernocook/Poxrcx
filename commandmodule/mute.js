const { default: parse } = require('parse-duration');
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionsBitField } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
		.setName("mute")
		.setDescription("Mute someone from the server.")
        .addUserOption(option =>
            option.setName("user").setDescription("User to mute").setRequired(true)
        )
        .addStringOption(option =>
            option.setName("limit").setDescription("How long to mute the user").setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason").setDescription("Reason why you mute this user").setRequired(false)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            if (!argument[0]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid user.`).setColor(`Red`)] });
            if (!argument[1]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Missing mute duration!`).setColor(`Red`)] });
            
            const mentioneduser = message.mentions.members.first();
            console.log(message.mentions)
            const parsetime = require('parse-duration').default;
            const mspack = require('ms');
            if (!mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid user.`).setColor(`Red`)] });
            if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !message.member.permissions.has(PermissionsBitField.Flags.KickMembers) && !message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to mute user!`).setColor(`Red`)] })
            //if (!message.guild) return message.channel.send("I don't have permission to time out people please enable it!")
            if (message.member === mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't mute yourself.`).setColor(`Red`)] })

            //Check position to not abuse or exploit
            const mentioned_userPosition = mentioneduser.roles.highest.position;
            const author_sendPosition = message.member.roles.highest.position;
            const botMember = message.guild.members.cache.get(client.user.id);
            const botPermissions = message.guild.members.me.permissions;
            const botPosition = botMember.roles.highest.position;
        
            if (message.author.id !== message.guild.ownerId) {
                if (mentioned_userPosition > author_sendPosition) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> That user is a moderator, I can't do that.`).setColor(`Red`)] })
                if (!botPermissions.has(PermissionsBitField.Flags.BanMembers) && !botPermissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] });
                if (botPosition <= mentioned_userPosition) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] })
            } else {
                if (!botPermissions.has(PermissionsBitField.Flags.BanMembers) && !botPermissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] });
                if (botPosition <= mentioned_userPosition) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] })
            }

            const parsedtime = parsetime(argument[1])

            let reason = argument.slice(2).join(" ") || 'No reason given.'
            if (!reason) reason = 'No reason given.'
            if (reason.trim() === "") {
                reason = 'No reason given.'
            }

            if (parsedtime < mspack("1m") || parsedtime > mspack("14d")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please use valid limit less than 14 days and more than 1 minute.`).setColor(`Red`)] });

            mentioneduser.timeout(parsedtime, reason).then(() => {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> User ${mentioneduser} was muted for **${reason}**`).setColor(`Green`)] });
            }).catch(() => {
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> I can't mute ${mentioneduser}, maybe my role position is too low.`).setColor(`Red`)] });
            });
        } else if (typeofcommand === "interaction"){
            const mentioneduser = message.guild.members.cache.find(user => message.options.getUser("user").id === user.id);
            const parsetime = require('parse-duration').default;
            const mspack = require('ms');
            if (!mentioneduser) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid user.`).setColor(`Red`)] });
            if (!message.guild.members.cache.find(user => message.user.id === user.id).permissions.has(PermissionsBitField.Flags.Administrator) && !message.guild.members.cache.find(user => message.user.id === user.id).permissions.has(PermissionsBitField.Flags.KickMembers) && !message.guild.members.cache.find(user => message.user.id === user.id).permissions.has(PermissionsBitField.Flags.BanMembers)) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to mute user!`).setColor(`Red`)] })
            //if (!message.guild) return message.editReply("I don't have permission to time out people please enable it!")
            if (message.guild.members.cache.find(user => message.user.id === user.id) === mentioneduser) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't mute yourself.`).setColor(`Red`)] })

            //Check position to not abuse or exploit
            const mentioned_userPosition = mentioneduser.roles.highest.position;
            const author_sendPosition = message.member.roles.highest.position;
            const botMember = message.guild.members.cache.get(client.user.id);
            const botPermissions = message.guild.members.me.permissions;
            const botPosition = botMember.roles.highest.position;
        
            if (message.user.id !== message.guild.ownerId) {
                if (mentioned_userPosition > author_sendPosition) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> That user is a moderator, I can't do that.`).setColor(`Red`)] })
                if (!botPermissions.has(PermissionsBitField.Flags.BanMembers) && !botPermissions.has(PermissionsBitField.Flags.Administrator)) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] });
                if (botPosition <= mentioned_userPosition) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] })
            } else {
                if (!botPermissions.has(PermissionsBitField.Flags.BanMembers) && !botPermissions.has(PermissionsBitField.Flags.Administrator)) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] });
                if (botPosition <= mentioned_userPosition) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] })
            }

            const parsedtime = parsetime(message.options.getString("limit"))

            let reason = message.options.getString("reason") || 'No reason given.'
            if (!reason) reason = 'No reason given.'
            if (reason.trim() === "") {
                reason = 'No reason given.'
            }

            if (parsedtime < mspack("1m") || parsedtime > mspack("14d")) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please use valid limit less than 14 days and more than 1 minute.`).setColor(`Red`)] });

            mentioneduser.timeout(parsedtime, reason).then(() => {
                message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> User ${mentioneduser} was muted for **${reason}**`).setColor(`Green`)] });
            }).catch(() => {
                message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> I can't mute ${mentioneduser}, maybe my role position is too low.`).setColor(`Red`)] })
            });
        }
    }
}