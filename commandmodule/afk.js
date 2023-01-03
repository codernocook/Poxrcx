const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("afk")
		.setDescription("Set your status to Afk")
        .addSubcommand(subcommand =>
			subcommand
				.setName("set")
				.setDescription("Set your status to Afk")
				.addStringOption(option =>
                    option.setName("message").setDescription("the message you want other user know.").setRequired(false)
                )
                .addMentionableOption(option =>
                    option.setName("user").setDescription("The user you want to set afk, leave a blank if it is you").setRequired(false)
                ),
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("remove")
				.setDescription("Remove your status to Afk")
                .addMentionableOption(option =>
                    option.setName("user").setDescription("The user you want to remove afk status.").setRequired(true)
                )
				.addStringOption(option =>
                    option.setName("reason").setDescription("reason why you remove the user afk status.").setRequired(false)
                ),
		),
    execute(argument, message, EmbedBuilder, client, typeofcommand, afk) {
        if (typeofcommand === "message") {
            if (afk.has(message.author.id)) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You already use this command in another server.`).setColor(`Red`)] })
            const subcommand = argument[0]
            if (subcommand === "set") {
                let user = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0]);
                if (!user) user = message.author
                if (afk.has(user.id)) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You already use this command in another server.`).setColor(`Red`)] })
                let reason = argument.slice(1).join(" ");
                afk.set(user.id, {
                    [1]: Date.now(),
                    [2]: reason,
                    [3]: message.guild,
                    [4]: user.username
                })
    
                // Checking Position when change name
                /* disabled the module cuz it lag
                if (message.guild.members.me.roles.highest.permissions > message.guild.members.cache.find(user => message.user.id === user.id).roles.highest.permissions) {
                    message.guild.members.cache.find(user => message.user.id === user.id).setNickname(`[AFK] ${message.user.username}`)
                }
                */
    
                if (reason) {
                    message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> <@${user.id}> You are now afk for \`${reason}\`.`).setColor(`Green`)] })
                } else {
                    message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> <@${user.id}> You are now afk.`).setColor(`Green`)] })
                }
            } else if (subcommand === "remove") {
                let user = argument[1]
                let reason = argument.slice(2).join(" ");
                if (!user) user = message.author
                if (!user.id) return
                if (afk.has(user.id)) {
                    message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Removed ${user.tag} afk tag, reason: ${reason}`).setColor(`Green`)] })
                    try {
                        afkset.delete(message.author.id)
                        /* Disabled because it laggy
                        if (message.guild.members.me.roles.highest.permissions > message.guild.members.cache.find(user => message.author.id === user.id).roles.highest.permissions) {
                            message.guild.members.cache.find(user => message.author.id === user.id).setNickname(`${afkset.get(message.author.id)[4]}`)
                        }
                        */
                    }
                    catch (error) {
                        console.log(error)
                        message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> I can't remove ${user.tag} afk tag.`).setColor(`Red`)] })
                    }
                } else {
                    message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You didn't have any afk status to remove.`).setColor(`Red`)] })
                }
            }
        } else if (typeofcommand === "interaction"){
            if (message.options.getSubcommand() === "set") {
                let user = message.options.getMentionable("user")
                if (!user) user = message.user
                if (afk.has(user.id)) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You already use this command in another server.`).setColor(`Red`)] })
                let reason = message.options.getString("message")
                afk.set(user.id, {
                    [1]: Date.now(),
                    [2]: reason,
                    [3]: message.guild,
                    [4]: user.username
                })
    
                // Checking Position when change name
                /* disabled the module cuz it lag
                if (message.guild.members.me.roles.highest.permissions > message.guild.members.cache.find(user => message.user.id === user.id).roles.highest.permissions) {
                    message.guild.members.cache.find(user => message.user.id === user.id).setNickname(`[AFK] ${message.user.username}`)
                }
                */
    
                if (reason) {
                    message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> <@${user.id}> You are now afk for \`${reason}\`.`).setColor(`Green`)] })
                } else {
                    message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> <@${user.id}> You are now afk.`).setColor(`Green`)] })
                }
            } else if (message.options.getSubcommand() === "remove") {
                let user = message.options.getString("user")
                let reason = message.options.getString("reason")
                if (!user) user = message.user
                if (!user.id) return
                if (afk.has(user.id)) {
                    message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Removed ${user.tag} afk tag, reason: ${reason}`).setColor(`Green`)] })
                    try {
                        afkset.delete(message.author.id)
                        /* Disabled because it laggy
                        if (message.guild.members.me.roles.highest.permissions > message.guild.members.cache.find(user => message.author.id === user.id).roles.highest.permissions) {
                            message.guild.members.cache.find(user => message.author.id === user.id).setNickname(`${afkset.get(message.author.id)[4]}`)
                        }
                        */
                    }
                    catch (error) {
                        console.log(error)
                        message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> I can't remove ${user.tag} afk tag.`).setColor(`Red`)] })
                    }
                } else {
                    message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You didn't have any afk status to remove.`).setColor(`Red`)] })
                }
            }
        }
    }
}