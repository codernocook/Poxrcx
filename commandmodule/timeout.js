module.exports = {
    name: 'Timeout',
    description: "Timeout user",
    execute(argument, message) {
        if (!argument[0]) return message.channel.send("Invaild user.")
        if (!argument[1]) return message.channel.send("Missing Length to timeout")
            const mentioneduser = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0])
            if (!mentioneduser) return message.channel.send("Invaild user.")
            if (!message.member.permissions.has("Administrator")) return message.channel.send("You don't have permission to time out user!")
            //if (!message) return message.channel.send("I don't have permission to time out people please enable it!")
            if (message.member === mentioneduser) return message.channel.send("You can't timeout yourself")
            if (!mentioneduser.timeout) return message.channel.send("You don't have permission to do that")
    
            let reason = argument.slice(1).join(" ") || 'No reason given.'
    
            message.channel.send(`Time out user ${mentioneduser} for ${argument[1]}, length ${argument[2]}.`)
            mentioneduser.timeout((parseInt(arguments[1]) * 60 * 1000), argument[2]).catch(err => {message.channel.send("ERORR: #length3")})
    }
}