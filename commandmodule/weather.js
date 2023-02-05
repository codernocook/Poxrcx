const { SlashCommandBuilder } = require("@discordjs/builders")
require('dotenv').config({path: "../settings.env"}); // load weather env file;
const weathertoken = process.env.weatherapitoken

module.exports = {
    data: new SlashCommandBuilder()
		.setName("weather")
		.setDescription("Get weather info from any location.")
        .addStringOption(option =>
            option.setName("city").setDescription("The city you want to get weather infomation.").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand) {
        if (typeofcommand === "message") {
            let data = argument.slice(0).join(" ");

           if (data) {
            if (data.trim() === "") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild City/Location. Please type a invaild location.`).setColor(`Red`)] });
            try {
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data}&units=metric&appid=${weathertoken}`).then(res => res.json()).then(response => {
                    if (response["cod"] === "429") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> The weather api has been limited, please try again later.`).setColor(`Red`)] });
                    if (response["cod"] === "404") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild City/Location. Please type a invaild location.`).setColor(`Red`)] });
                    if (response["cod"] !== 200 && response["cod"] !== "404" && response["cod"] !== "429") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Some thing went wrong with this command, please try again later.`).setColor(`Red`)] });
                    let apiData = response;
                    let currentTemp = Math.ceil(apiData.main.temp)
                    let maxTemp = apiData.main.temp_max;
                    let minTemp = apiData.main.temp_min;
                    let humidity = apiData.main.humidity;
                    let wind = apiData.wind.speed;
                    let cityName = data;
                    let country = apiData.sys.country
                    let pressure = apiData.main.pressure;
                    let cloudness = apiData.weather[0].description;
    
                    message.channel.send({ embeds: [new EmbedBuilder().setTitle(`There is ${currentTemp}\u00B0 C in ${cityName}, ${country}`).setDescription(`**Maximum Temperature:** ${maxTemp}\u00B0 C\n**Minimum Temperature:** ${minTemp}\u00B0 C\n**Humidity:** ${humidity}\n**Wind Speed:** ${wind}\n**Pressure:** ${pressure}\n **Cloudiness:** ${cloudness}`).setColor(`Blue`)] });
                })
            } catch {}
           }
        } else if (typeofcommand === "interaction"){
            let data = message.options.getString("city");

           if (data) {
            if (data.trim() === "") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild Country/City/Location. Please type a invaild location.`).setColor(`Red`)] });
            try {
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data}&units=metric&appid=${weathertoken}`).then(res => res.json()).then(response => {
                    if (response["cod"] === "429") return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> The weather api has been limited, please try again later.`).setColor(`Red`)] });
                    if (response["cod"] === "404") return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invaild City/Location. Please type a invaild location.`).setColor(`Red`)] });
                    if (response["cod"] !== 200 && response["cod"] !== "404" && response["cod"] !== "429") return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Some thing went wrong with this command, please try again later.`).setColor(`Red`)] });
                    let apiData = response;
                    let currentTemp = Math.ceil(apiData.main.temp)
                    let maxTemp = apiData.main.temp_max;
                    let minTemp = apiData.main.temp_min;
                    let humidity = apiData.main.humidity;
                    let wind = apiData.wind.speed;
                    let cityName = data;
                    let country = apiData.sys.country
                    let pressure = apiData.main.pressure;
                    let cloudness = apiData.weather[0].description;
    
                    message.reply({ embeds: [new EmbedBuilder().setTitle(`There is ${currentTemp}\u00B0 C in ${cityName}, ${country}`).setDescription(`**Maximum Temperature:** ${maxTemp}\u00B0 C\n**Minimum Temperature:** ${minTemp}\u00B0 C\n**Humidity:** ${humidity}\n**Wind Speed:** ${wind}\n**Pressure:** ${pressure}\n **Cloudiness:** ${cloudness}`).setColor(`Blue`)] });
                })
            } catch {}
           }
        }
    }
}