const { Client, REST, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, Guild, GuildMember, Routes, ActivityType, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions] });
const token = process.env.token;
const rest = new REST({ version: '10' }).setToken(token);
const prefix = process.env.prefix;
let commandcooldown = new Set();
let interactioncooldown = new Set();
let afkset = new Map();
const fs = require('fs');
const path = require('path');
const moment = require("moment");
const { GiveawaysManager } = require('discord-giveaways');


function executefile(filerequire, argumentsend, messagesend, typeofcommand) {
    if (!filerequire === "afk") {
        require(`./commandmodule/${filerequire}`).execute(argumentsend, messagesend, EmbedBuilder, client, typeofcommand)
    } else {
        require(`./commandmodule/${filerequire}`).execute(argumentsend, messagesend, EmbedBuilder, client, typeofcommand, afkset)
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

    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}

// insert giveaway to client so it have access anywhere
const mongoose = require('mongoose');

const giveawaySchema = new mongoose.Schema(
    {
        messageId: String,
        channelId: String,
        guildId: String,
        startAt: Number,
        endAt: Number,
        ended: Boolean,
        winnerCount: Number,
        prize: String,
        messages: {
            giveaway: String,
            giveawayEnded: String,
            title: String,
            inviteToParticipate: String,
            drawing: String,
            dropMessage: String,
            winMessage: mongoose.Mixed,
            embedFooter: mongoose.Mixed,
            noWinner: String,
            winners: String,
            endedAt: String,
            hostedBy: String
        },
        thumbnail: String,
        image: String,
        hostedBy: String,
        winnerIds: { type: [String], default: undefined },
        reaction: mongoose.Mixed,
        botsCanWin: Boolean,
        embedColor: mongoose.Mixed,
        embedColorEnd: mongoose.Mixed,
        exemptPermissions: { type: [], default: undefined },
        exemptMembers: String,
        bonusEntries: String,
        extraData: mongoose.Mixed,
        lastChance: {
            enabled: Boolean,
            content: String,
            threshold: Number,
            embedColor: mongoose.Mixed
        },
        pauseOptions: {
            isPaused: Boolean,
            content: String,
            unPauseAfter: Number,
            embedColor: mongoose.Mixed,
            durationAfterPause: Number,
            infiniteDurationText: String
        },
        isDrop: Boolean,
        allowedMentions: {
            parse: { type: [String], default: undefined },
            users: { type: [String], default: undefined },
            roles: { type: [String], default: undefined }
        }
    },
    { id: false }
);

// create mongodb model
const giveawayModel = mongoose.model('giveaways', giveawaySchema);

const { GiveawaysManager } = require('discord-giveaways');

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
    // This function is called when the manager needs to get all giveaways which are stored in the database.
    async getAllGiveaways() {
        // Get all giveaways from the database. We fetch all documents by passing an empty condition.
        return await giveawayModel.find().lean().exec();
    }

    // This function is called when a giveaway needs to be saved in the database.
    async saveGiveaway(messageId, giveawayData) {
        // Add the new giveaway to the database
        await giveawayModel.create(giveawayData);
        // Don't forget to return something!
        return true;
    }

    // This function is called when a giveaway needs to be edited in the database.
    async editGiveaway(messageId, giveawayData) {
        // Find by messageId and update it
        await giveawayModel.updateOne({ messageId }, giveawayData).exec();
        // Don't forget to return something!
        return true;
    }

    // This function is called when a giveaway needs to be deleted from the database.
    async deleteGiveaway(messageId) {
        // Find by messageId and delete it
        await giveawayModel.deleteOne({ messageId }).exec();
        // Don't forget to return something!
        return true;
    }
};

client.giveaways = new GiveawayManagerWithOwnDatabase(client, {
    default: {
        botsCanWin: false,
        embedColor: '#FF0000',
        embedColorEnd: '#000000',
        reaction: '🎉'
    }
});

// Run command handle
client.on("ready", () => {
    client.user.setActivity('./help', { type: ActivityType.Playing });
    console.log("Poxrcx v3.0 started!")
    // Deploy all interaction command when bot started
    const guild_ids = client.guilds.cache.map(guild => guild.id);

    for (const guildId of guild_ids) {
        rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), {body: commands}).catch(err => console.log(err));
    }
})

client.on("guildCreate", async (guildcreate) => {
    rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildcreate.id), {body: commands}).catch(err => console.log(err));
})

client.on("messageCreate", async (message) => {
    // afk module
    if (!message.author.bot) {
        const [ timestamp, reason, guild, oldusername ] = afkset.get(mentionget.id); // get all the infomation about afk user
        // Check if user not afk and send back message
        if (afkset.has(message.author.id)) {
            if (!guild.id === message.guildId) return;
            message.channel.send(`Welcome back <@${message.author.id}>!`)
            try {
                afkset.delete(message.author.id)
                message.guild.members.cache.find(user => message.user.id === user.id).setNickname(`${oldusername}`)
            }
            catch (error) {
                console.log(error)
            }
        }
        // Respond afk message if someone mention afk user
        let mentionget = message.mentions.members.first()

        if (mentionget) {
            if (afkset.has(mentionget.id)) {
                const timeago = moment(timestamp).fromNow();

                message.channel.send(`${mentionget.username} afked for **${timeago}**, AFK Message: ${reason}.`)
            }
        }
    }
    // Check cooldown for command
    if(commandcooldown.has(message.author.id)) {
        if (!message.content.startsWith(prefix) || message.author.bot) return; // check again if bot send message to themself
        return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Wah slow down you are too fast!`).setColor(`Red`)] })
    } else {
        if (!message.content.startsWith(prefix) || message.author.bot) return; // check if dumb discord bot send message.
        // Check it again if it have any mistake
        if(commandcooldown.has(message.author.id)) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Wah slow down you are too fast!`).setColor(`Red`)] })
        // Add delay
        commandcooldown.add(message.author.id);
        //Run the command checker
            const args = message.content.slice(prefix.length).split(/ +/);
            const command = args.shift().toLowerCase();
            const messaggearray = message.content.split(" ");
            const argument = messaggearray.slice(1);
            const cmd = messaggearray[0];

            //run the command
            const execpath = `./commandmodule/${command}.js`
            try {
                if (fs.existsSync(execpath)) {
                    executefile(`${command}`, argument, message, "message")
                }
            } catch(err) {}
        // remove user command timeout
        setTimeout(() => {
            commandcooldown.delete(message.author.id);
        }, 500);
    }
})

client.on('interactionCreate', async (interaction) => {
    // Check cooldown for command
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return

    // check if the user spam to run the command
    if (interactioncooldown.has(interaction.user.id)) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Wah slow down you are too fast!`).setColor(`Red`)] });

    interactioncooldown.add(interaction.user.id)

    try {
        await executefile(`${interaction.commandName}`, {}, interaction, "interaction");
    }
    catch(error) {
        console.log(error);
    }
    // remove user interaction timeout
    setTimeout(() => {
        interactioncooldown.delete(interaction.user.id);
    }, 500);
});

client.login(token)