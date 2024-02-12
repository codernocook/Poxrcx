/*
	Poxrcx
	Copyright (C) 2024 codernocook

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

const { SlashCommandBuilder } = require("@discordjs/builders")

// Functions
const getMaxDaysInMonth = (month, year) => {
	// Check if the month is within a valid range (1 to 12), In javascript it follows system time range: (0 - 11)
	if (month < 0 || month > 11) {
		return false;
	}

	// Use the Date object to get the last day of the next month (day 0 of the current month)
	var lastDayOfNextMonth = new Date(year, month, 0);

	// The last day of the month is the day before day 0 of the next month
	return lastDayOfNextMonth.getDate();
}

// Calling
module.exports = {
	data: new SlashCommandBuilder()
		.setName("birthday")
		.setDescription("Set/Remove your birthday in order to make everyone will know it's your birthday time.")
		.addSubcommand(subcommand =>
			subcommand
				.setName("set")
				.setDescription("Set your birthday")
				.addStringOption(option =>
					option.setName("day").setDescription("Day of your birth").setRequired(true)
				)
				.addStringOption(option =>
					option.setName("month").setDescription("Month of your birth").setRequired(true)
				)
				.addStringOption(option =>
					option.setName("year").setDescription("Year of your birth").setRequired(true)
				),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName("remove")
				.setDescription("Remove your birthday")
		),
	execute(argument, message, EmbedBuilder, client, typeofcommand, database_service) {
		if (typeofcommand === "message") {
			if (argument[0] === "set") {
				// Check author
				if (!message && !message.author && !message.author.id) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid message object, because you're an real entity.`).setColor(`Red`)] });

				// Message date object
				const date_obj = new Date();

				// Not a valid birthday
				if (!Number(argument[1]) || Number(argument[1]) === NaN) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Your Day of birth is not a number.`).setColor(`Red`)] });
				if (!Number(argument[2]) || Number(argument[2]) === NaN) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Your Month of birth is not a number.`).setColor(`Red`)] });
				if (!Number(argument[3]) || Number(argument[3]) === NaN) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Your Year of birth is not a number.`).setColor(`Red`)] });

				// Long month of birth
				const month_ofBirth_Long = new Date(Number(argument[3]), Number(argument[2]) - 1, Number(argument[1])).toLocaleString('default', { month: 'long' });

				// Check if the day is more than a month limit
				if (Number(argument[1]) < 1 && Number(argument[1]) >= 0) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> There's no day zero (0) in the world.`).setColor(`Red`)] });
				if (Number(argument[1]) < 0) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> There's no day with a negative number in the world.`).setColor(`Red`)] });
				if (Number(argument[1]) > getMaxDaysInMonth(Number(argument[2]) - 1, Number(argument[3]))) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> There's no day ${Number(argument[1])} in ${month_ofBirth_Long?.toString()} ${Number(argument[3])}`).setColor(`Red`)] });

				// Arguments
				let day_ofBirth = Number(argument[1]);
				let month_ofBirth = Number(argument[2]);
				let year_ofBirth = Number(argument[3]);

				// Set
				database_service["personal"].get(`_${message.author.id}`, (personal_has) => {
					let postedToPublic = [];
					if (personal_has !== undefined && personal_has["postedToPublic"] !== undefined) postedToPublic = personal_has["postedToPublic"] || [];

					// Check
					database_service["personal"].set(`_${message.author.id}`, {
						"userid": message.author.id,
						"birthday": {
							"day": day_ofBirth,
							"month": month_ofBirth,
							"year": year_ofBirth,
							"time_set_birthday": Date.now()
						},
						"postedToPublic": postedToPublic || []
					}, () => {
						// Tell the user back
						return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Successfully set your birthday\nYour birthday will be made public on the specified date.\nYou can remove your birthday by running command \`./birthday remove\``).setColor(`Green`)] })
					})
				})
			} else if (argument[0] === "remove") {
				database_service["personal"].has(`_${message.author.id}`, (personal_has) => {
					if (personal_has === true) {
						database_service["personal"].delete(`_${message.author.id}`, () => {
							return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Successfully removed your birthday.`).setColor(`Green`)] })
						})
					} else if (personal_has === false) {
						return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You haven't set your birthday yet.`).setColor(`Red`)] });
					}
				})
			} else if (argument[0] !== "set" && argument[0] !== "remove") {
				return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Missing subcommand set/remove. Try again with \`./birthday set\` or \`./birthday remove\``).setColor(`Red`)] });
			}
		} else if (typeofcommand === "interaction") {
			// Variables
			let subcommand = message.options.getSubcommand();

			if (subcommand === "set") {
				// Variables converted
				let day_ofBirth_interaction = message.options.getString("day");
				let month_ofBirth_interaction = message.options.getString("month");
				let year_ofBirth_interaction = message.options.getString("year");

				// Check author
				if (!message && !message.author && !message.user.id) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid message object, because you're an real entity.`).setColor(`Red`)] });

				// Message date object
				const date_obj = new Date();

				// Not a valid birthday
				if (!Number(day_ofBirth_interaction) || Number(day_ofBirth_interaction) === NaN) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Your Day of birth is not a number.`).setColor(`Red`)] });
				if (!Number(month_ofBirth_interaction) || Number(month_ofBirth_interaction) === NaN) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Your Month of birth is not a number.`).setColor(`Red`)] });
				if (!Number(year_ofBirth_interaction) || Number(year_ofBirth_interaction) === NaN) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Your Year of birth is not a number.`).setColor(`Red`)] });

				// Long month of birth
				const month_ofBirth_Long = new Date(Number(year_ofBirth_interaction), Number(month_ofBirth_interaction) - 1, Number(day_ofBirth_interaction)).toLocaleString('default', { month: 'long' });

				// Check if the day is more than a month limit
				if (Number(day_ofBirth_interaction) < 1 && Number(day_ofBirth_interaction) >= 0) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> There's no day zero (0) in the world.`).setColor(`Red`)] });
				if (Number(day_ofBirth_interaction) < 0) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> There's no day with a negative number in the world.`).setColor(`Red`)] });
				if (Number(day_ofBirth_interaction) > getMaxDaysInMonth(Number(month_ofBirth_interaction) - 1, Number(year_ofBirth_interaction))) return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> There's no day ${Number(day_ofBirth_interaction)} in ${month_ofBirth_Long?.toString()} ${Number(year_ofBirth_interaction)}`).setColor(`Red`)] });

				// Arguments
				let day_ofBirth = Number(day_ofBirth_interaction);
				let month_ofBirth = Number(month_ofBirth_interaction);
				let year_ofBirth = Number(year_ofBirth_interaction);

				// Set
				database_service["personal"].get(`_${message.user.id}`, (personal_has) => {
					let postedToPublic = [];
					if (personal_has !== undefined && personal_has["postedToPublic"] !== undefined) postedToPublic = personal_has["postedToPublic"] || [];

					// Check
					database_service["personal"].set(`_${message.user.id}`, {
						"userid": message.user.id,
						"birthday": {
							"day": day_ofBirth,
							"month": month_ofBirth,
							"year": year_ofBirth,
							"time_set_birthday": Date.now()
						},
						"postedToPublic": postedToPublic || []
					}, () => {
						// Tell the user back
						return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Successfully set your birthday\nYour birthday will be made public on the specified date.\nYou can remove your birthday by running command \`./birthday remove\``).setColor(`Green`)] })
					})
				})
			} else if (subcommand === "remove") {
				database_service["personal"].has(`_${message.user.id}`, (personal_has) => {
					if (personal_has === true) {
						database_service["personal"].delete(`_${message.user.id}`, () => {
							return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Successfully removed your birthday.`).setColor(`Green`)] })
						})
					} else if (personal_has === false) {
						return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You haven't set your birthday yet.`).setColor(`Red`)] });
					}
				})
			}
		}
	}
}