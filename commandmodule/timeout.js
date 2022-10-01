module.exports = {
    name: 'Timeout',
    description: "Timeout user",
    execute(argument, message) {
        if (!argument[0]) return message.channel.send("Invaild user.")
        if (!argument[2]) return message.channel.send("Missing Length to timeout")
        if (!argument[3]) return message.channel.send("Missing Type of Length [s:second, m:minute, h:hour, d:day, w:week, m:month")
            const mentioneduser = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0])
            if (!mentioneduser) return message.channel.send("Invaild user.")
            if (!message.member.permissions.has("Administrator")) return message.channel.send("You don't have permission to time out user!")
            //if (!message) return message.channel.send("I don't have permission to time out people please enable it!")
            if (message.member === mentioneduser) return message.channel.send("You can't timeout yourself")
    
            let reason = argument.slice(1).join(" ") || 'No reason given.'
    
            if (argument[3] === "s") {
                message.channel.send(`Time out user ${mentioneduser} for ${argument[1]}, length ${argument[2]}.`)
                mentioneduser.timeout(parseInt(arguments[1]), argument[2]).catch(err => {message.channel.send("ERORR: #length3[1]")})
            }
            if (argument[3] === "m") {
                message.channel.send(`Time out user ${mentioneduser} for ${argument[1]}, length ${argument[2]}.`)
                mentioneduser.timeout(parseInt(arguments[1]) * 60, argument[2]).catch(err => {message.channel.send("ERORR: #length3[2]")})
            }
            if (argument[3] === "h") {
                message.channel.send(`Time out user ${mentioneduser} for ${argument[1]}, length ${argument[2]}.`)
                mentioneduser.timeout(parseInt(arguments[1]) * 60 * 60, argument[2]).catch(err => {message.channel.send("ERORR: #length3[3]")})
            }
            if (argument[3] === "d") {
                message.channel.send(`Time out user ${mentioneduser} for ${argument[1]}, length ${argument[2]}.`)
                mentioneduser.timeout(parseInt(arguments[1]) * 60 * 60 * 24, argument[2]).catch(err => {message.channel.send("ERORR: #length3[4]")})
            }
            if (argument[3] === "w") {
                message.channel.send(`Time out user ${mentioneduser} for ${argument[1]}, length ${argument[2]}.`)
                mentioneduser.timeout(parseInt(arguments[1]) * 60 * 60 * 24 * 7, argument[2]).catch(err => {message.channel.send("ERORR: #length3[5]")})
            }
            if (argument[3] === "m") {
                message.channel.send(`Time out user ${mentioneduser} for ${argument[1]}, length ${argument[2]}.`)
                mentioneduser.timeout(parseInt(arguments[1]) * 60 * 60 * 24 * 7 * 30, argument[2]).catch(err => {message.channel.send("ERORR: #length[6]")})
            }
    }
}