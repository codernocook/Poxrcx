const { ThreadMemberFlags } = require("discord.js")

module.exports = {
    name: 'Giveaway',
    description: "Start a giveway or stop a giveaway!",
    execute(argument, message, EmbedBuilder) {
        if (!argument[1]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Missing channel!`).setColor(`Red`)] })
        if (!argument[2]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Missing winner number!`).setColor(`Red`)] })
        if (!argument[3]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Missing duration!`).setColor(`Red`)] })
        if (!argument[4]) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Missing name of the giveaway!`).setColor(`Red`)] })
        
        const channel = message.mentions.channels.first();
        const EntriesCount = 0;
        const EnterCheck = {}
        if (channel) {
            channel.send({ embeds: [new EmbedBuilder().setDescription(`Hosted by: ${message.author}\nEntries: ${EntriesCount}\nWinner: ${argument[2]}\nDuration: ${argument[3]}`).setColor(`Blue`)] });
            message.react(`:tada:`);
            const reacted = message.createReactionCollector({ filter, time: 15000 })
            reacted.on("collect", (reaction, user) => {
                EntriesCount = EntriesCount + 1;
                table.insert(EnterCheck, {user: EntriesCount})
            })
        }else {
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Invaild channel!`).setColor(`Red`)] });
        }
    }
}