module.exports = {
    name: 'Meme',
    description: "Random a meme and send them in channel!",
    execute(argument, message, EmbedBuilder) {
        const randommeme = Math.floor(Math.random() * 20) + 1;
        const memetable = {
            1: "https://tenor.com/view/walter-white-falling-fast-gif-18043850",
            2: "https://tenor.com/view/who-asked-me-trying-to-find-who-asked-spongebob-spunch-bob-gif-22526294",
            3: "https://tenor.com/view/yuor-mother-your-mother-gif-21840949",
            4: "https://tenor.com/view/no-dad-gif-23245428",
            5: "https://tenor.com/view/nerd-nerdy-nerds-nerd-emoji-gif-25380417",
            6: "https://tenor.com/view/rock-one-eyebrow-raised-rock-staring-the-rock-gif-22113367",
            7: "https://tenor.com/view/the-rock-sus-the-rock-meme-the-rock-sus-meme-gif-23972805",
            8: "https://tenor.com/view/beluga-cat-meme-discord-belugas-hub-discord-server-cat-epic-gif-25282934",
            9: "https://tenor.com/view/what-you-sure-you-sure-about-that-dog-watching-gif-26139783",
            10: "https://tenor.com/view/manly-roblox-roblox-meme-roblox-man-face-roblox-smile-gif-25254135",
            11: "https://tenor.com/view/big-oof-size-small-medium-switch-gif-17355313",
            12: "https://tenor.com/view/krnl-roblox-exploit-exploit-robux-kernel-gif-19597348",
            13: "https://tenor.com/view/roblox-krnl-falta-karnl-ice-bear-update-synapse-gif-20237358",
            14: "https://tenor.com/view/moderatorvsexploiter-gif-25796019",
            15: "https://tenor.com/view/roblox-doors-doors-roblox-average-doors-player-gif-26568651",
            16: "https://tenor.com/view/fortnite-are-you-playing-fortnite-right-now-gif-24351575",
            17: "https://tenor.com/view/discord-mod-meme-memes-memes-in-general-no-memes-in-general-gif-25059340",
            18: "https://tenor.com/view/blippi-blippi-meme-ip-address-ip-address-meme-i-have-your-ip-address-gif-25511125",
            19: "https://tenor.com/view/hamster-meme-staring-hd-watching-gif-23055924",
            20: "https://tenor.com/view/meme-downloading-bing-gif-24764671",
        };
        message.channel.send(`${memetable[randommeme]}`);
    }
}