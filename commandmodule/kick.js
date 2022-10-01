module.exports = {
    name: 'Kick',
    description: "Kick player out of the server!",
    execute(argument, message, EmbedBuilder) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0])
        if (!argument[1]) argument[1] = "best lawyer don't need reason."
        if (!message.member.permissions.has("KickMembers") && !message.member.permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`You don't have permission to kick!`).setColor(`Red`)] })
        if (member.permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`You don't have permission to kick this user!`).setColor(`Red`)] })
        if (member) {
            const membertarget = message.guild.members.cache.get(member.id);
            membertarget.kick({ reason: `${argument[1]}` });
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`:white_check_mark: Kicked ${member} for ${argument[1]}`).setColor(`Green`)] })
        }else{
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Invaild user!`).setColor(`Red`)] })
        }
    }
}