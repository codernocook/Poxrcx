const { SlashCommandBuilder } = require("@discordjs/builders")
const { default: parse } = require('parse-duration');

module.exports = {
    data: new SlashCommandBuilder()
		.setName("giveaway")
		.setDescription("Start or end a giveaway.")
        .addSubcommand(subcommand =>
			subcommand
				.setName("start")
				.setDescription("Start a giveaway.")
				.addChannelOption(option =>
					option.setName("channel").setDescription("The channel to start the giveaway").setRequired(true)
				)
                .addNumberOption(option =>
					option.setName("winners").setDescription("The Winner number of the giveaway").setRequired(true)
				)
                .addStringOption(option =>
					option.setName("duration").setDescription("Duration of the giveaway").setRequired(true)
				)
                .addStringOption(option =>
					option.setName("name").setDescription("Giveaway name").setRequired(true)
				),
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("end")
				.setDescription("End a giveaway.")
				.addStringOption(option =>
					option.setName("message-id").setDescription("the giveaway message id you want to end").setRequired(true)
				),
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("reroll")
				.setDescription("Reroll winner of the giveaway.")
				.addStringOption(option =>
					option.setName("message-id").setDescription("the giveaway message id you want to reroll").setRequired(true)
				),
		),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> This command only support slash command.`).setColor(`Red`)] })
        } else if (typeofcommand === "interaction"){
            if (message.options.getSubcommand() === "start") {
                if (!message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("ManageEvents") && !message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to create/stop a giveaway.`).setColor(`Red`)] })
                const channel = message.options.getChannel("channel") || message.channel;
                const winners = message.options.getNumber("winners");
                const duration = message.options.getString("duration");
                const prize = message.options.getString("name");
    
                if (!Number(winners)) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild winner number.`).setColor(`Red`)] })
                const winnerCount = Number(winners);
    
                const parsetime = require('parse-duration').default;
                const mspack = require('ms');
    
                const durationcalc = parsetime(duration);

                client.giveaways.start(channel, {
                        duration: durationcalc,
                        winnerCount,
                        prize,
                        messages: {
                            giveaway: '🎉🎉 **GIVEAWAY** 🎉🎉',
                            giveawayEnded: '🎉🎉 **GIVEAWAY ENDED** 🎉🎉',
                            title: '{this.prize}',
                            drawing: 'Drawing: {timestamp}',
                            dropMessage: 'Be the first to react with 🎉 !',
                            inviteToParticipate: 'React with 🎉 to participate!',
                            winMessage: { embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> 'Congratulations, {winners}! You won **{this.prize}**!'`).setColor(`Green`)] },
                            embedFooter: '{this.winnerCount} winner(s)',
                            noWinner: 'Giveaway cancelled, no valid participations.',
                            hostedBy: 'Hosted by: {this.hostedBy}',
                            winners: 'Winner(s):',
                            endedAt: 'Ended at'
                        }
                    }).then((data) => {
                        message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Started giveaway!`).setColor(`Green`)], ephemeral: true });
                    })
                    .catch((err) => {
                        message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Something when wrong, I can't start the giveaway!`).setColor(`Red`)], ephemeral: true })
                    });
            } else if (message.options.getSubcommand() === "end") {
                if (!message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("ManageEvents") && !message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to create/stop a giveaway.`).setColor(`Red`)] })
                const messageidget = message.options.getString("message-id")
                client.giveaways.end(messageidget)
                    .then(() => {
                        message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Ended the giveaway.`).setColor(`Green`)] });
                    })
                    .catch((err) => {
                        message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> This giveaway has already ended or invaild message id.`).setColor(`Red`)], ephemeral: true })
                    });
            } else if (message.options.getSubcommand() === "reroll") {
                if (!message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("ManageEvents") && !message.guild.members.cache.find(user => message.user.id === user.id).permissions.has("Administrator")) return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> You don't have permission to create/stop a giveaway.`).setColor(`Red`)] })
                const messageidget = message.options.getString("message-id")
                client.giveaways.reroll(messageidget, {
                    congrat: ':tada: New winner(s): {winners}! Congratulations, you won **{this.prize}**!\n{this.messageURL}',
                    error: 'No valid participations, no new winner(s) can be chosen!'
                })
            }
        }
    }
}