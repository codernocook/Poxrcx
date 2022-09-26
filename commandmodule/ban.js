module.exports = {
    name: 'Ban',
    description: "Ban player out of the server!",
    execute(argument, message) {
        if (!argument[0]) return message.channel.send("Invaild user.")
        const mentioneduser = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0])
        if (!mentioneduser) return message.channel.send("Invaild user.")
        if (!message.member.permissions.has("BanMembers")) return message.channel.send("You don't have permission to ban!")
        //if (!message) return message.channel.send("I don't have permission to ban people please enable it!")
        if (message.member === mentioneduser) return message.channel.send("You can't ban yourself")
        if (!mentioneduser.kickable) return message.channel.send("You don't have permission to do that")

        let reason = argument.slice(1).join(" ") || 'No reason given.'

        message.channel.send(`Kicked user ${mentioneduser} for ${argument[1]}, length ${argument[2]}.`)
        mentioneduser.kick(argument[1]).catch(err => {message.channel.send("ERORR: #length2")})
        mentioneduser.ban()
    }
}