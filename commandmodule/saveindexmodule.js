const { Client, REST, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, Guild, GuildMember } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const token = "MTAyMzU4NTU5MjE1MzQ3MzEyNQ.G9ooDD.lC8CxSEA3qEArrtJeqakoAcKA_R4HH6ptyZppE";
const rest = new REST({ version: '10' }).setToken(token);
const prefix = "./";

client.on("ready", () => {
    client.user.setActivity("ROBLOX", {type:"PLAYING"})
    console.log("Running Discord bot")
})

client.on("messageCreate", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const messaggearray = message.content.split(" ");
    const argument = messaggearray.slice(1);
    const cmd = messaggearray[0];

    //command

    if (command === 'ping') {
        message.channel.send(`pong with 0 ping`)
    }
    if (command === 'kick') {
        if (!argument[0]) return message.channel.send("Invaild user.")
        const mentioneduser = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0])
        if (!mentioneduser) return message.channel.send("Invaild user.")
        if (!message.member.permissions.has("KickMembers")) return message.channel.send("You don't have permission to kick!")
        //if (!message) return message.channel.send("I don't have permission to kick people please enable it!")
        if (message.member === mentioneduser) return message.channel.send("You can't kick yourself")
        if (!mentioneduser.kickable) return message.channel.send("You don't have permission to do that")

        let reason = argument.slice(1).join(" ") || 'No reason given.'

        message.channel.send(`Kicked user ${argument} for ${argument1}, length ${argument2}.`)
        mentioneduser.kick().catch(err => {message.channel.send("ERORR: #length1")})
    }
    if (command === 'ban') {
        if (!argument[0]) return message.channel.send("Invaild user.")
        const mentioneduser = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0])
        if (!mentioneduser) return message.channel.send("Invaild user.")
        if (!message.member.permissions.has("BanMembers")) return message.channel.send("You don't have permission to ban!")
        //if (!message) return message.channel.send("I don't have permission to ban people please enable it!")
        if (message.member === mentioneduser) return message.channel.send("You can't ban yourself")
        if (!mentioneduser.kickable) return message.channel.send("You don't have permission to do that")

        let reason = argument.slice(1).join(" ") || 'No reason given.'

        message.channel.send(`Kicked user ${argument} for ${argument[1]}.`)
        mentioneduser.kick(argument[1]).catch(err => {message.channel.send("ERORR: #length2")})
        mentioneduser.ban()
    }
    if (command === "annoy") {
        message.channel.send("STOP ANNOYING BITCH")
        message.channel.send("@everyone This shit annoying me")
    }
    if (command === "help") {
        message.channel.send("There are no command btw, just kidding!")
        message.channel.send("Prefix: ./")
        message.channel.send("ping: send useless message")
        message.channel.send("kick: [user]")
        message.channel.send("annoy but don't try to annoy me you will reget it")
        message.channel.send("Made by Itzporium!")
    }
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});

client.login(token)