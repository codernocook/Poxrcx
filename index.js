const { Client, REST, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, Guild, GuildMember } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const token = process.env.token; //"MTAyMzU4NTU5MjE1MzQ3MzEyNQ.G9ooDD.lC8CxSEA3qEArrtJeqakoAcKA_R4HH6ptyZppE";
const rest = new REST({ version: '10' }).setToken(token);
const prefix = process.env.prefix; //"./";

function executefile(filerequire, argumentsend, messagesend) {
    if (require(`./commandmodule/${filerequire}`)) {
        require(`./commandmodule/${filerequire}`).execute(argumentsend, messagesend, EmbedBuilder)
    }
}

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

    if (command === "help") {
        executefile(`${command}`, argument, message)
    }
    if (command === "ping") {
        executefile(`${command}`, argument, message)
    }
    if (command === "kick") {
        executefile(`${command}`, argument, message)
    }
    if (command === "ban") {
        executefile(`${command}`, argument, message)
    }
    if (command === "timeout") {
        executefile(`${command}`, argument, message)
    }
    if (command === "annoy") {
        executefile(`${command}`, argument, message)
    }
    if (command === "rat") {
        executefile(`${command}`, argument, message)
    }
    if (command === "meme") {
        executefile(`${command}`, argument, message)
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
