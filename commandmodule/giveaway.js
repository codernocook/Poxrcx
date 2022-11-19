const { SlashCommandBuilder } = require("@discordjs/builders")
const { GiveawayCreator } = require('discord-giveaway');
const { default: parse } = require('parse-duration');
const Creator = new GiveawayCreator(client, 'mongodb://Itzporium:<It2porium1310@>@cluster0.j8tw5sp.mongodb.net/?retryWrites=true&w=majority');

module.exports = {
    data: new SlashCommandBuilder()
		.setName("giveaway")
		.setDescription("Start or end a giveaway.")
        .addSubcommand(subcommand =>
			subcommand
				.setName("start")
				.setDescription("Start a giveaway.")
				.addChannelOption(option =>
					option.setName("channel").setDescription("The channel to start the giveaway").setRequired(false)
				)
                .addStringOption(option =>
					option.setName("winner").setDescription("The Winner number of the giveaway").setRequired(true)
				)
                .addStringOption(option =>
					option.setName("duration").setDescription("Duration of the giveaway").setRequired(true)
				)
                .addStringOption(option =>
					option.setName("name").setDescription("Giveaway name").setRequired(true)
				)
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("end")
				.setDescription("End a giveaway.")
				.addStringOption(option =>
					option.setName("giveaway").setDescription("the giveaway name you want to end").setRequired(true)
				)
		),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        client.giveaways = Creator
        if (typeofcommand === "message") {
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> This command only support slash command.`).setColor(`Red`)] })
        } else if (typeofcommand === "interaction"){
            if (interaction.options.getSubcommand() === "start") {
                const channel = message.options.getChannel("channel") || message.channel;
                const winner = message.options.addNumberOption("winner");
                const duration = message.options.getMentionable("duration");
                const name = message.options.getMentionable("name");
    
                if (!Number(winner)) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild winner number.`).setColor(`Red`)] })
    
                const parsetime = require('parse-duration').default;
                const mspack = require('ms');
    
                const durationcalc = parsetime(duration);
    
                client.giveaways.startGiveaway({
                    prize: name,
                    channelId: channel.id,
                    guildId: message.guild.id,
                    duration: durationcalc,
                    winners: Number(duration),
                    hostedBy: message.user.id
                })
            } else if (interaction.options.getSubcommand() === "end") {
                const giveawayname = message.options.getMentionable("giveaway");
                const giveawayend = client.giveaways.endGiveaway(giveawayname);

                if (!giveawayend) {
                    message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> This giveaway has already ended.`).setColor(`Red`)] });
                } else {
                    message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxSuccess:1027083813123268618> Ended the giveaway.`).setColor(`Green`)] });
                }
            }
        }
    }
}
