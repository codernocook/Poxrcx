const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
		.setName("meme")
		.setDescription("Get a random meme!"),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        function randomIntFromInterval(min, max) { // min and max included
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        const memearray = {
            1: "https://cdn.discordapp.com/attachments/1025771587049377894/1041714150361022484/image.png",
            2: "https://preview.redd.it/hx6hf7zcdvz91.png?width=640&crop=smart&auto=webp&s=7183d00cf376cb2a5f8784b9710806274e0d674f",
            3: "https://i.redd.it/5ujt3jasswz91.jpg",
            4: "https://preview.redd.it/p1msd3knduz91.png?width=640&crop=smart&auto=webp&s=bf69cc2fb20f5ade89726c11f9c732fb4206a747",
            5: "https://preview.redd.it/su1n0n02jsz91.png?width=640&crop=smart&auto=webp&s=fa6af73a8ad4228c9dcab5818b013f38254ec3ec",
            6: "https://i.redd.it/2yzk47gi9uz91.png",
            7: "https://preview.redd.it/i4dagavootz91.jpg?width=640&crop=smart&auto=webp&s=0c627dc068da46c09cddbefce5abacf97b17cc60",
            8: "https://preview.redd.it/5pu4tzksgrz91.jpg?width=640&crop=smart&auto=webp&s=5a597f689a546bef5d79b95d7186d335c7079858",
            9: "https://preview.redd.it/z257sutqfxz91.jpg?width=640&crop=smart&auto=webp&s=e37cf19c4f785999c2f5537ee6b552e35f3a0e47",
            10: "https://preview.redd.it/s5rjnn8h7xz91.jpg?width=640&crop=smart&auto=webp&s=f687c06b4cb969f389f0ee470475abfffadeec7d",
            11: "https://preview.redd.it/5p5mnk6icvz91.gif?width=640&format=mp4&s=16c83aefd849878bd33cade197b0efb5dc8547eb",
            11: "https://preview.redd.it/vwu2khov5xz91.gif?width=640&format=mp4&s=b535853efada9541afa2920e86c110598bb7c510",
            12: "https://preview.redd.it/1tbusp9zctz91.png?width=640&crop=smart&auto=webp&s=435a1d329b23312990d397e22132b026f9c540b9",
        }
        const memecounted = 12;
        const randommeme = randomIntFromInterval(1, memecounted);
        if (typeofcommand === "message") {
            message.channel.send(`${memearray[randommeme]}`);
        } else if (typeofcommand === "interaction"){
            message.reply(`${memearray[randommeme]}`);
        }
    }
}