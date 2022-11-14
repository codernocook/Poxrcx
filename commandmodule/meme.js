module.exports = {
    name: 'Meme',
    description: "Get a random meme!",
    execute(argument, message, EmbedBuilder) {
        function randomIntFromInterval(min, max) { // min and max included
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        const memetable = process.env.memearray;
        const memecounted = 0;
        // start calculate how many meme in the array.
        for (const memecounter of memetable) {
            if (memecounter === 0) memecounted++;
        }
        const randommeme = randomIntFromInterval(0, memecounted);
        message.channel.send(`${memetable[randommeme]}`);
    }
}
