const { SlashCommandBuilder } = require("@discordjs/builders")
const prefixdb = require("../prefixdb.js");
require('dotenv').config({path: "../settings.env"}); // load the prefix if the new set is the old one

module.exports = {
    data: new SlashCommandBuilder()
		.setName("prefix")
		.setDescription("Change discord bot prefix.")
        .addStringOption(option =>
            option.setName("prefix").setDescription("The prefix you want to set to.").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            let prefixtype = argument.join(" ").trim();
            
            if (!message.member.permissions.has("ManageGuild") && !message.member.permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to change the guild prefix.`).setColor(`Red`)] });

            if (!prefixtype) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please type a valid prefix you want to set.`).setColor(`Red`)] });
            if (prefixtype.trim() === "") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please type a valid prefix you want to set.`).setColor(`Red`)] });
            
            if (prefixtype) {
                if (prefixtype.trim() === process.env.prefix) {
                    message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Changed the prefix to \`${prefixtype.trim()}\``).setColor(`Green`)] });
                    prefixdb.has(`${message.guildId}`, function(callback) {
                        if (callback === true) {
                            prefixdb.delete(`${message.guildId}`, function(prefixdel) {});
                        }
                    })
                    return;
                }
                prefixdb.set(`${message.guildId}`, {
                    "time": Date.now(),
                    "prefix": prefixtype.trim(),
                    "serverinfo": message.guild,
                    "changedby": message.author
                }, function(callback) {});
            }
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Changed the prefix to \`${prefixtype.trim()}\``).setColor(`Green`)] });
        } else if (typeofcommand === "interaction"){
            let prefixtype = message.options.getString("prefix");

            if (!message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("ManageGuild") && !message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("Administrator")) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to change the guild prefix.`).setColor(`Red`)] });

            if (!prefixtype) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please type a valid prefix you want to set.`).setColor(`Red`)] });
            if (prefixtype.trim() === "") return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Please type a valid prefix you want to set.`).setColor(`Red`)] });
            
            if (prefixtype) {
                if (prefixtype.trim() === process.env.prefix) {
                    message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Changed the prefix to \`${prefixtype.trim()}\``).setColor(`Green`)] });
                    prefixdb.has(`${message.guildId}`, function(callback) {
                        if (callback === true) {
                            prefixdb.delete(`${message.guildId}`, function(prefixdel) {});
                        }
                    })
                    return;
                }
                prefixdb.set(`${message.guildId}`, {
                    "time": Date.now(),
                    "prefix": prefixtype.trim(),
                    "serverinfo": message.guild,
                    "changedby": message.user
                }, function(callback) {});
            }
            message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Changed the prefix to \`${prefixtype.trim()}\``).setColor(`Green`)] });
        }
    }
}