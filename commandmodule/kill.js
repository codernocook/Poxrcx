module.exports = {
    name: 'Kill',
    description: "Kill player",
    execute(argument, message, EmbedBuilder) {
        if (!argument[0]) message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Invaild Target!`).setColor(`Red`)] })
            const mentioneduser = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0])
            if (!mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Invaild Target!`).setColor(`Red`)] })
            //if (!message) return message.channel.send("I don't have permission to kick people please enable it!")
            if (message.member === mentioneduser) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Please I don't want you to die, you are the best murder!`).setColor(`Red`)] })
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`:white_check_mark: You killed ${mentioneduser}!`).setColor(`Green`)] })
    }
}