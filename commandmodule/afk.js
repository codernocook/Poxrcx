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
                ),
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("remove")
				.setDescription("Remove your status to Afk")
                .addUserOption(option =>
                    option.setName("user").setDescription("The user you want to remove afk status.").setRequired(true)
                )
				.addStringOption(option =>
                    option.setName("reason").setDescription("reason why you remove the user afk status.").setRequired(false)
                ),
		),
    execute(argument, message, EmbedBuilder, client, typeofcommand, afk) {
        if (typeofcommand === "message") {
            const subcommand = argument[0]
            afk.has(message.author.id + `_${message.guildId}`, function(callback) {
                if (subcommand === "set") {
                    let user = message.author;
                    if (callback === true) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You already use this command in this server.`).setColor(`Red`)] })
                    let reason = argument.slice(1).join(" ");
                    afk.set(user.id + `_${message.guildId}`, {
                        "1": Date.now(),
                        "2": reason,
                        "3": message.guild.id,
                        "4": user.username
                    }, function(callset) {})
        
                    // Checking Position when change name
                    /* disabled the module cuz it lag
                    if (message.guild.members.me.roles.highest.permissions > message.guild.members.cache.find(user => message.user.id === user.id).roles.highest.permissions) {
                        message.guild.members.cache.find(user => message.user.id === user.id).setNickname(`[AFK] ${message.user.username}`)
                    }
                    */
        
                    if (reason) {
                        message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> <@${user.id}> You are now afk. Message: "${reason}"`).setColor(`Green`)] })
                    } else {
                        message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> <@${user.id}> You are now afk.`).setColor(`Green`)] })
                    }
                } else if (subcommand === "remove") {
                    if (!message.member.permissions.has("KickMembers") && !message.member.permissions.has("BanMembers") && !message.member.permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to do that.`).setColor(`Red`)] })
                    let user = argument[1]
                    let reason = argument.slice(2).join(" ");
                    if (!user) user = message.author
                    if (!user.id) return
                    if (afk.has(user.id + `_${message.guildId}`)) {
                        message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Removed ${user.tag} afk tag, reason: "${reason}"`).setColor(`Green`)] })
                        try {
                            afkset.delete(user.id + `_${message.guildId}`, function(delafkuser) {});
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
                        message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> This user didn't have any afk status to remove.`).setColor(`Red`)] })
                    }
                }    
            })
        } else if (typeofcommand === "interaction"){
            afk.has(message.user.id + `_${message.guildId}`, function(callback) {
                if (message.options.getSubcommand() === "set") {
                    let user = message.user
                    if (callback === true) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You already use this command in this server.`).setColor(`Red`)] })
                    let reason = message.options.getString("message")
                    afk.set(user.id + `_${message.guildId}`, {
                        ["1"]: Date.now(),
                        ["2"]: reason,
                        ["3"]: message.guild.id,
                        ["4"]: user.username
                    }, function(callset) {})
        
                    // Checking Position when change name
                    /* disabled the module cuz it lag
                    if (message.guild.members.me.roles.highest.permissions > message.guild.members.cache.find(user => message.user.id === user.id).roles.highest.permissions) {
                        message.guild.members.cache.find(user => message.user.id === user.id).setNickname(`[AFK] ${message.user.username}`)
                    }
                    */
        
                    if (reason) {
                        message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> <@${user.id}> You are now afk. Message: "${reason}"`).setColor(`Green`)] })
                    } else {
                        message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> <@${user.id}> You are now afk.`).setColor(`Green`)] })
                    }
                } else if (message.options.getSubcommand() === "remove") {
                    if (!message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("KickMembers") && !message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("BanMembers") && !message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("Administrator")) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to do that.`).setColor(`Red`)] })
                    let user = message.guild.members.cache.find(user => message.options.getUser("user").id === user.id);
                    let reason = message.options.getString("reason")
                    if (!user) user = message.user
                    if (!user.id) return
                    if (afk.has(user.id + `_${message.guildId}`)) {
                        message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Removed <@${user.id}> afk tag, reason: "${reason}"`).setColor(`Green`)] })
                        try {
                            afkset.delete(user.id + `_${message.guildId}`, function(delafkuser) {});
                            /* Disabled because it laggy
                            if (message.guild.members.me.roles.highest.permissions > message.guild.members.cache.find(user => message.author.id === user.id).roles.highest.permissions) {
                                message.guild.members.cache.find(user => message.author.id === user.id).setNickname(`${afkset.get(message.author.id)[4]}`)
                            }
                            */
                        }
                        catch (error) {
                            console.log(error)
                            message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> I can't remove <@${user.id}> afk tag.`).setColor(`Red`)] })
                        }
                    } else {
                        message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> This user didn't have any afk status to remove.`).setColor(`Red`)] })
                    }
                }
            })
        }
    }
}
