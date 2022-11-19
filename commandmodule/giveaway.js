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
                .addIntegerOption(option =>
					option.setName("winner").setDescription("The Winner number of the giveaway").setRequired(true)
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
                const channel = message.options.getChannel("channel") || message.channel;
                const winner = message.options.getInteger("winner");
                const duration = message.options.getString("duration");
                const name = message.options.getString("name");
    
                if (!Number(winner)) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild winner number.`).setColor(`Red`)] })
    
                const parsetime = require('parse-duration').default;
                const mspack = require('ms');
    
                const durationcalc = parsetime(duration);
    
                // hostedBy: message.user.id
                client.giveawaysManager.start(channel.id, {
                        duration: durationcalc,
                        winner,
                        prize,
                        messages: {
                            giveaway: '🎉🎉 **GIVEAWAY** 🎉🎉',
                            giveawayEnded: '🎉🎉 **GIVEAWAY ENDED** 🎉🎉',
                            title: '{this.prize}',
                            drawing: 'Drawing: {timestamp}',
                            dropMessage: 'Be the first to react with 🎉 !',
                            inviteToParticipate: 'React with 🎉 to participate!',
                            winMessage: 'Congratulations, {winners}! You won **{this.prize}**!\n{this.messageURL}',
                            embedFooter: '{this.winnerCount} winner(s)',
                            noWinner: 'Giveaway cancelled, no valid participations.',
                            hostedBy: 'Hosted by: {this.hostedBy}',
                            winners: 'Winner(s):',
                            endedAt: 'Ended at'
                        }
                    }).then((data) => {
                        message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Started giveaway!`).setColor(`Green`)], ephemeral: true });
                    })
            } else if (message.options.getSubcommand() === "end") {
                const messageidget = message.options.getString("message-id")
                client.giveawaysManager.end(messageidget)
                    .then(() => {
                        message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Ended the giveaway.`).setColor(`Green`)] });
                    })
                    .catch((err) => {
                        message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> This giveaway has already ended or invaild message id.`).setColor(`Red`)], ephemeral: true })
                    });
            } else if (message.options.getSubcommand() === "reroll") {
                const messageidget = message.options.getString("message-id")
                client.giveawaysManager.reroll(messageidget, {
                    congrat: ':tada: New winner(s): {winners}! Congratulations, you won **{this.prize}**!\n{this.messageURL}',
                    error: 'No valid participations, no new winner(s) can be chosen!'
                })
            }
        }
    }
}
