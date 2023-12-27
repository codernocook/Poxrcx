/*
    Poxrcx
    Copyright (C) 2023  codernocook

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionsBitField } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
		.setName("kick")
		.setDescription("Kick someone from the server!")
        .addUserOption(option =>
            option.setName("user").setDescription("User to be kicked.").setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason").setDescription("The reason for the kick.").setRequired(false)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand, database_service) {
        if (typeofcommand === "message") {
            const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0]);
            if (!member) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid user!`).setColor(`Red`)] })
            if (!message.member.permissions.has("KickMembers") && !message.member.permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to kick!`).setColor(`Red`)] })
            if (member.permissions.has("Administrator") && !message.member.permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to kick this user!`).setColor(`Red`)] })

            //Check position to not abuse or exploit
            const mentioned_userPosition = member.roles.highest.position;
            const author_sendPosition = message.member.roles.highest.position;
            const botMember = message.guild.members.cache.get(client.user.id);
            const botPermissions = message.guild.members.me.permissions;
            const botPosition = botMember.roles.highest.position;
    
            if (message.author.id !== message.guild.ownerId) {
                if (mentioned_userPosition > author_sendPosition) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> That user is a moderator, I can't do that.`).setColor(`Red`)] })
                if (!botPermissions.has(PermissionsBitField.Flags.KickMembers) && !botPermissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] });
                if (botPosition <= mentioned_userPosition) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] })
            } else {
                if (!botPermissions.has(PermissionsBitField.Flags.KickMembers) && !botPermissions.has(PermissionsBitField.Flags.Administrator)) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] });
                if (botPosition <= mentioned_userPosition) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] })
            }

            let reason = argument.slice(1).join(" ") || 'No reason given.'
            if (!reason) reason = 'No reason given.'
            if (reason.trim() === "") {
                reason = 'No reason given.'
            }

            if (member) {
                const membertarget = message.guild.members.cache.get(member.id);
                membertarget.kick({ reason: `${reason}` });
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Kicked ${member} for **${reason}**`).setColor(`Green`)] }).catch(err => {message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> I can't kick this user, maybe my role position is too low.`).setColor(`Red`)] })})
            }else{
                message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid user!`).setColor(`Red`)] })
            }
        } else if (typeofcommand === "interaction"){
            const member = message.guild.members.cache.find(user => message.options.getUser("user").id === user.id);
            if (!member) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid user!`).setColor(`Red`)] })
            if (!message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("KickMembers") && !message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("Administrator")) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to kick!`).setColor(`Red`)] })
            if (member.permissions.has("Administrator") && !message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("Administrator")) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to kick this user!`).setColor(`Red`)] })

            //Check position to not abuse or exploit
            const mentioned_userPosition = member.roles.highest.position;
            const author_sendPosition = message.member.roles.highest.position;
            const botMember = message.guild.members.cache.get(client.user.id);
            const botPermissions = message.guild.members.me.permissions;
            const botPosition = botMember.roles.highest.position;
    
            if (message.author.id !== message.guild.ownerId) {
                if (mentioned_userPosition > author_sendPosition) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> That user is a moderator, I can't do that.`).setColor(`Red`)] })
                if (!botPermissions.has(PermissionsBitField.Flags.KickMembers) && !botPermissions.has(PermissionsBitField.Flags.Administrator)) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] });
                if (botPosition <= mentioned_userPosition) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] })
            } else {
                if (!botPermissions.has(PermissionsBitField.Flags.KickMembers) && !botPermissions.has(PermissionsBitField.Flags.Administrator)) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] });
                if (botPosition <= mentioned_userPosition) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] })
            }
            
            let reason = message.options.getString("reason") || 'No reason given.'
            if (!reason) reason = 'No reason given.'
            if (reason.trim() === "") {
                reason = 'No reason given.'
            }

            if (member) {
                const membertarget = message.guild.members.cache.get(member.id);
                membertarget.kick({ reason: `${reason}` });
                message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Kicked ${member} for **${reason}**`).setColor(`Green`)] }).catch(err => {message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> I can't kick this user, maybe my role position is too low.`).setColor(`Red`)] })})
            }else{
                message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid user!`).setColor(`Red`)] })
            }
        }
    }
}