const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("Ban someone from the server!")
        .addStringOption(option =>
            option.setName("user").setDescription("User to ban").setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason").setDescription("Reason why you ban this user").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            if (!argument[0]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild User!`).setColor(`Red`)] })
            const mentioneduser = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0]);
            if (!mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild User!`).setColor(`Red`)] })
            if (!message.member.permissions.has("BanMembers") && !message.member.permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to ban!`).setColor(`Red`)] })
            if (message.member === mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't ban yourself!`).setColor(`Red`)] })
            if (!mentioneduser.bannable) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't ban the owner and moderator!`).setColor(`Red`)] })

            //Check position to not abuse or exploit
            const mentioneduserposition = mentioneduser.roles.highest.position
            const authorsendposition = client.guilds.cache.find(usercommand => usercommand.roles.highest.permissions)
            const botposition = message.guild.members.me
    
            if (botposition < mentioneduserposition) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] })
            if (mentioneduserposition > authorsendposition) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> That user is a moderator, I can't do that.`).setColor(`Red`)] })

            // Checking if reason value is filled or not
            let reason = argument.slice(1).join(" ") || 'No reason given.'
            // Start banning
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Banned user ${mentioneduser} for ${reason}.`).setColor(`Green`)] })
            mentioneduser.ban({ reason: `${argument[1]}` }).catch(err => {message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> I can't ban this user, maybe my role position is too low.`).setColor(`Red`)] })})
        } else if (typeofcommand === "interaction") {
            const mentioneduser = interaction.options.getString("user");
            if (!mentioneduser) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild User!`).setColor(`Red`)] })
            if (!interaction.guild.members.cache.find(user => interaction.user.id).permissions.has("BanMembers") && !interaction.guild.members.cache.find(user => interaction.user.id).permissions.has("Administrator")) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to ban!`).setColor(`Red`)] })
            if (interaction.guild.members.cache.find(user => interaction.user.id) === mentioneduser) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't ban yourself!`).setColor(`Red`)] })
            if (!mentioneduser.bannable) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't ban the owner and moderator!`).setColor(`Red`)] })

            //Check position to not abuse or exploit
            const mentioneduserposition = mentioneduser.roles.highest.position
            const authorsendposition = client.guilds.cache.find(usercommand => usercommand.roles.highest.permissions)
            const botposition = message.guild.members.me
    
            if (botposition < mentioneduserposition) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> My role position is too low.`).setColor(`Red`)] })
            if (mentioneduserposition > authorsendposition) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> That user is a moderator, I can't do that.`).setColor(`Red`)] })

            // Checking if reason value is filled or not
            let reason = interaction.options.getString("reason") || 'No reason given.'
            // Start banning
            message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Banned user ${mentioneduser} for ${reason}.`).setColor(`Green`)] })
            mentioneduser.ban({ reason: `${argument[1]}` }).catch(err => {message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> I can't ban this user, maybe my role position is too low.`).setColor(`Red`)] })})
        }
    }
}