const { default: parse } = require('parse-duration');
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("unmute")
		.setDescription("Unmute someone from the server!")
        .addUserOption(option =>
            option.setName("user").setDescription("User to unmute").setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason").setDescription("Reason why you unmute this user.").setRequired(false)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            const mentioneduser = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0])
            const parsetime = require('parse-duration').default;
            const mspack = require('ms');

            if (!mentioneduser) return message.channel.send("Invalid user.")
            if (message.member === mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't unmute yourself!`).setColor(`Red`)] })
            if (!message.member.permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to unmute this user!`).setColor(`Red`)] })

            //Check position to not abuse or exploit
            const mentioneduserposition = mentioneduser.roles.highest.position
            const authorsendposition = message.member.roles.highest.position
            const botMember = message.guild.members.cache.get(client.user.id);
            const botPermissions = new client.Permissions(botMember.permissions.bitfield);
            const botPosition = botMember.roles.highest.position;
    
            if (mentioneduserposition > authorsendposition) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> That user is a moderator, I can't do that.`).setColor(`Red`)] })
            if (!botPermissions.has("BanMembers")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] });
            if (botPosition < mentioneduserposition) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] })
            
            const parsedtime = parsetime(argument[1])
            let reason = argument.slice(1).join(" ") || 'No reason given.'
            if (!reason) reason = 'No reason given.'
            if (reason.trim() === "") {
                reason = 'No reason given.'
            }

            mentioneduser.timeout(parsedtime, reason).catch(err => {message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> I can't unmute user ${mentioneduser}`).setColor(`Red`)] })});
    
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> User ${mentioneduser} was unmuted.`).setColor(`Green`)] })
        } else if (typeofcommand === "interaction") {
            const mentioneduser = message.guild.members.cache.find(user => message.options.getUser("user").id === user.id);
            const parsetime = require('parse-duration').default;
            const mspack = require('ms');

            if (!mentioneduser) return message.reply("Invalid user.")
            if (message.guild.members.cache.find(user => message.user.id === user.id) === mentioneduser) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't unmute yourself!`).setColor(`Red`)] })
            if (!message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("Administrator")) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to unmute this user!`).setColor(`Red`)] })

             //Check position to not abuse or exploit
             const mentioneduserposition = mentioneduser.roles.highest.position
             const authorsendposition = message.member.roles.highest.position
             const botMember = message.guild.members.cache.get(client.user.id);
             const botPermissions = new client.Permissions(botMember.permissions.bitfield);
             const botPosition = botMember.roles.highest.position;

             if (mentioneduserposition > authorsendposition) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> That user is a moderator, I can't do that.`).setColor(`Red`)] })
             if (!botPermissions.has("BanMembers")) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] });
             if (botPosition < mentioneduserposition) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] })

            let reason = message.options.getString("reason") || 'No reason given.'
            if (!reason) reason = 'No reason given.'
            if (reason.trim() === "") {
                reason = 'No reason given.'
            }

            mentioneduser.timeout("0", reason).catch(err => {message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> I can't unmute user ${mentioneduser}`).setColor(`Red`)] })});
    
            message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> User ${mentioneduser} was unmuted.`).setColor(`Green`)] })
        }
    }
}
