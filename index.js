const { Client, REST, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, Guild, GuildMember, Routes, ActivityType, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const token = process.env.token; //"MTAyMzU4NTU5MjE1MzQ3MzEyNQ.G9ooDD.lC8CxSEA3qEArrtJeqakoAcKA_R4HH6ptyZppE";
const rest = new REST({ version: '10' }).setToken(token);
const prefix = process.env.prefix; //"./";
let commandcooldown = new Set();
let interactioncooldown = new Set()
const fs = require('fs');
const path = require('path');

function executefile(filerequire, argumentsend, messagesend, typeofcommand) {
    if (require(`./commandmodule/${filerequire}`)) {
        require(`./commandmodule/${filerequire}`).execute(argumentsend, messagesend, EmbedBuilder, client, typeofcommand)
    }
}

// List of all commands
const commands = [];
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commandmodule");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    try {
        client.commands.set(command.data.data, command);
    }
    catch (error) {
        console.log(filePath)
    }
    commands.push(command.data.toJSON());
}

client.on("ready", () => {
    client.user.setActivity('./help', { type: ActivityType.Playing });
    console.log("Poxrc v3.0 started!")
    // Deploy all interaction command when bot started
    const guild_ids = client.guilds.cache.map(guild => guild.id);

    for (const guildId of guild_ids) {
        rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), {body: commands}).catch(console.error);
    }
})

client.on("guildCreate", async (guildcreate) => {
    rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildcreate.id), {body: commands}).catch(console.error);
})

client.on("messageCreate", async (message) => {
    if(commandcooldown.has(toString(message.author.id))) {
        if (!message.content.startsWith(prefix) || message.author.bot) return; // check again if bot send message to themself
        return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Wah slow down you are too fast!`).setColor(`Red`)] })
    } else {
        if (!message.content.startsWith(prefix) || message.author.bot) return; // check if dumb discord bot send message.
        // Check it again if it have any mistake
        if(commandcooldown.has(toString(message.author.id))) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Wah slow down you are too fast!`).setColor(`Red`)] })
        // Add delay
        commandcooldown.add(toString(message.author.id));
        //Run the command checker
            const args = message.content.slice(prefix.length).split(/ +/);
            const command = args.shift().toLowerCase();
            const messaggearray = message.content.split(" ");
            const argument = messaggearray.slice(1);
            const cmd = messaggearray[0];

            //run the command
            const execpath = `/${command}`
            try {
                if (fs.existsSync(execpath)) {
                    executefile(`${command}`, argument, message, "message")
                }
            } catch(err) {}
        // remove user command timeout
        setTimeout(() => {
            commandcooldown.delete(toString(message.author.id));
        }, 800);
    }
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return

    // check if the user spam to run the command
    if (interactioncooldown.has(toString(interaction.user.id))) return;

    interactioncooldown.add(toString(interaction.user.id))

    try {
        await command.execute(`${interaction.command}`, {}, interaction, "interaction");
    }
    catch(error) {
        console.error(error);
    }
    // remove user interaction timeout
    setTimeout(() => {
        interactioncooldown.delete(toString(message.author.id));
    }, 800);
});

client.login(token)
