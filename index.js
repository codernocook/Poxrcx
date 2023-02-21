const { Client, REST, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, Guild, GuildMember, Routes, ActivityType, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions] });
require('dotenv').config({path: "./settings.env"}); // load the env
const token = process.env.token;
const clientid = process.env.client_id;
const prefix = process.env.prefix;
const ownerid = process.env.ownerid;
const rest = new REST({ version: '10' }).setToken(token);
let commandcooldown = new Set();
let interactioncooldown = new Set();
let afkset = require("./dbfetch.js");
let prefixdb = require("./prefixdb.js");
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
client.giveaways = new GiveawaysManager(client, {
    storage: './giveaways.json',
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
    function SetBotStatus() {
        client.user.setActivity('./help', { type: ActivityType.Playing });
        setTimeout(SetBotStatus, 3600000); // loop the playing status every 1 hour to patch (discord.js) bug
    }
    SetBotStatus(); // Run the loop 
    console.log("Poxrcx v3.5 started!")
    // Deploy all interaction command when bot started
    rest.put(Routes.applicationCommands(clientid), {body: commands}).catch(err => console.log(err));
})

client.on("guildDelete", async (guildDelete) => {
    // Remove afk when bot leave a server!
    for (const guilddeletemember of guildDelete.members.id) {
        try {
            afkset.get(guilddeletemember.id + `_${guilddeletemember.guild.id}`, function(getcallbackvalue) {
                if (getcallbackvalue === undefined || getcallbackvalue === null) return;
                afkset.delete(guilddeletemember.id + `_${guilddeletemember.guild.id}`, function(del) {});
                guilddeletemember.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> You left the server, I removed your Afk status.`).setColor(`Green`)] })
            })
        } catch {}
    }
})

client.on("guildMemberRemove", async (guildMemberRemove) => {
    // Remove afk when a user leave the user
    afkset.get(guildMemberRemove.id + `_${guildMemberRemove.guild.id}`, function(getcallbackvalue) {
        try {
            if (getcallbackvalue === undefined || getcallbackvalue === null) return;
            afkset.delete(guildMemberRemove.id + `_${guildMemberRemove.guild.id}`, function(del) {});
            guildMemberRemove.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> You left the server, I removed your Afk status.`).setColor(`Green`)] })
        } catch {}
    })
})

client.on("messageCreate", async (message) => {
    // afk module
    if (!message.author.bot) {
        // Check if user not afk and send back message
        afkset.has(message.author.id + `_${message.guildId}`, function(callback) {
            if (callback === true) {
                afkset.get(message.author.id + `_${message.guildId}`, function(getcallbackvalue) {
                    if (getcallbackvalue === undefined || getcallbackvalue === null) return;
                    if (Number(message.guildId) === Number(getcallbackvalue["3"].id)) {
                        message.channel.send(`Welcome back <@${message.author.id}>, I removed your Afk status.`)
                        try {
                            afkset.delete(message.author.id + `_${message.guildId}`, function(delafkuser) {});
                            /* Disabled because it laggy
                            if (message.guild.members.me.roles.highest.permissions > message.guild.members.cache.find(user => message.author.id === user.id).roles.highest.permissions) {
                                message.guild.members.cache.find(user => message.author.id === user.id).setNickname(`${afkset.get(message.author.id)["4"]}`)
                            }
                            */
                        }
                        catch (error) {
                            console.log(error)
                        }
                        return;
                    }
                })
            }
            // Respond afk message if someone mention afk user
            let mentionget = message.mentions.members.first();
    
            if (mentionget) {
                afkset.get(mentionget.id + `_${message.guildId}`, function(getcallbackvaluemention) {
                    if (callback === true) {
                        if (Number(message.guildId) === Number(getcallbackvaluemention["3"].id)) {
                            const timeago = moment(getcallbackvaluemention["1"]).fromNow();
                            if (getcallbackvaluemention["2"]) {
                                message.channel.send(`\`${mentionget.user.username}\` afked for **${timeago}**, AFK Message: ${getcallbackvaluemention["2"]}.`)
                            } else if (!getcallbackvaluemention["2"]) {
                                message.channel.send(`\`${mentionget.user.username}\` afked for **${timeago}**.`)
                            }
                            return;
                        }
                    }
                })
            }
        })
    }
    // Check cooldown for command
    prefixdb.get(`${message.guildId}`, function(callbackprefixget0) {
        // Start the command check, run
        let callbackprefix = callbackprefixget0 || undefined;

        if (callbackprefix !== undefined) {
            callbackprefix = callbackprefixget0["prefix"];
        }

        if (!message.content.startsWith(callbackprefix) && !message.content.startsWith(prefix)) {
            return;
        }

        if(commandcooldown.has(message.author.id)) {
            if (message.author.bot) return; // check again if bot send message to themself
            return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Wah slow down you are too fast!`).setColor(`Red`)] })
        } else {
            //OwnerCommand (Only for owner)
            if (message.content.startsWith(`<@${message.guild.members.me.id}>`) && Number(message.author.id) === Number(ownerid)) return message.channel.send("I'm Always here!");
            // Start normal command
            if (message.author.bot) return; // check if dumb discord bot send message.
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
                //check if command is vaild
                try {
                    if (fs.existsSync(execpath)) {
                        // check if the command spam error
                        try {
                            executefile(`${command}`, argument, message, "message")
                        } catch (error) {
                            console.log(error);
                            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Something went wrong with this command.`).setColor(`Red`)] }).catch(() => {})
                        }
                    }
                } catch(err) {}
            // remove user command timeout
            setTimeout(() => {
                return commandcooldown.delete(message.author.id);
            }, 900);
        }
    });
})

client.on('interactionCreate', async (interaction) => {
    // Checking if user is afk
    afkset.has(interaction.user.id + `_${interaction.guildId}`, function(callback) {
        if (callback === true) {
            afkset.get(interaction.user.id + `_${interaction.guildId}`, function(getcallbackvalue) {
                if (getcallbackvalue === undefined || getcallbackvalue === null) return;
                if (Number(interaction.guildId) === Number(getcallbackvalue["3"].id)) {
                    interaction.channel.send(`Welcome back <@${interaction.user.id}>, I removed your Afk status.`)
                    try {
                        afkset.delete(interaction.user.id + `_${interaction.guildId}`, function(delafkuser) {});
                        /* Disabled because it laggy
                        if (interaction.guild.members.me.roles.highest.permissions > interaction.guild.members.cache.find(user => interaction.author.id === user.id).roles.highest.permissions) {
                            interaction.guild.members.cache.find(user => interaction.author.id === user.id).setNickname(`${afkset.get(interaction.author.id)["4"]}`)
                        }
                        */
                    }
                    catch (error) {
                        console.log(error)
                    }
                }
            })
        }
    })
    /////////

    // Check cooldown for command
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return

    // check if the user spam to run the command
    if (interactioncooldown.has(interaction.user.id)) return interaction.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Wah slow down you are too fast!`).setColor(`Red`)], ephemeral: true });

    interactioncooldown.add(interaction.user.id)

    // execute the command
    try {
        await executefile(`${interaction.commandName}`, {}, interaction, "interaction");
    }
    catch(error) {
        console.log(error);
        interaction.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Something went wrong with this command.`).setColor(`Red`)] }).catch(() => {})
    }
    // remove user interaction timeout
    setTimeout(() => {
        interactioncooldown.delete(interaction.user.id);
    }, 900);
});

client.login(token)