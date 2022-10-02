const { Client, REST, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, Guild, GuildMember } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const token = process.env.token; //"MTAyMzU4NTU5MjE1MzQ3MzEyNQ.G9ooDD.lC8CxSEA3qEArrtJeqakoAcKA_R4HH6ptyZppE";
const rest = new REST({ version: '10' }).setToken(token);
const prefix = process.env.prefix; //"./";

function executefile(filerequire, argumentsend, messagesend, messagesendtype) {
    if (require(`./commandmodule/${filerequire}`)) {
        require(`./commandmodule/${filerequire}`).execute(argumentsend, messagesend, EmbedBuilder, messagesendtype)
    }
}

client.on("ready", () => {
    client.user.setActivity('./help', { type: ActivityType.Playing });
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
        executefile(`${command}`, argument, message, "command")
    }
    if (command === "ping") {
        executefile(`${command}`, argument, message, "command")
    }
    if (command === "kick") {
        executefile(`${command}`, argument, message, "command")
    }
    if (command === "ban") {
        executefile(`${command}`, argument, message, "command")
    }
    if (command === "unban") {
        executefile(`${command}`, argument, message, "command")
    }
    if (command === "timeout") {
        executefile(`${command}`, argument, message, "command")
    }
    if (command === "annoy") {
        executefile(`${command}`, argument, message, "command")
    }
    if (command === "rat") {
        executefile(`${command}`, argument, message, "command")
    }
    if (command === "meme") {
        executefile(`${command}`, argument, message, "command")
    }
})

client.on('interactionCreate', (interaction) => {
    client.guilds.cache.get(interaction.guild.id).commands.create({name: "ping", description: "Reply with pong!"})
    client.guilds.cache.get(interaction.guild.id).commands.create({name: "help", description: "Show the help info!"})
    if (!interaction.isChatInputCommand()) return;
    const { commandinteraction } = interaction;
    const argument = {}

	if (commandinteraction === "help") {
        executefile(`${command}`, argument, interaction, "interaction")
    }
    if (commandinteraction === "ping") {
        executefile(`${command}`, argument, interaction, "interaction")
    }
    if (commandinteraction === "kick") {
        executefile(`${command}`, argument, interaction, "interaction")
    }
    if (commandinteraction === "ban") {
        executefile(`${command}`, argument, interaction, "interaction")
    }
    if (commandinteraction === "unban") {
        executefile(`${command}`, argument, interaction, "interaction")
    }
    if (commandinteraction === "timeout") {
        executefile(`${command}`, argument, interaction, "interaction")
    }
    if (commandinteraction === "annoy") {
        executefile(`${command}`, argument, interaction, "interaction")
    }
    if (commandinteraction === "rat") {
        executefile(`${command}`, argument, interaction, "interaction")
    }
    if (commandinteraction === "meme") {
        executefile(`${command}`, argument, interaction, "interaction")
    }
});

client.login(token)
