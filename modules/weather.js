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

const { SlashCommandBuilder } = require("@discordjs/builders")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config(); // load weather env file;
const weathertoken = process.env.weatherapitoken

module.exports = {
    data: new SlashCommandBuilder()
		.setName("weather")
		.setDescription("Get weather info from any location.")
        .addStringOption(option =>
            option.setName("city").setDescription("The city you want to get weather infomation.").setRequired(true)
        ),
    execute(argument, message, EmbedBuilder, client, typeofcommand, database_service) {
        if (typeofcommand === "message") {
            let data = argument.slice(0).join(" ");

           if (data) {
            if (data.trim() === "") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid City/Location. Please type a invalid location.`).setColor(`Red`)] });
            try {
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data}&units=metric&appid=${weathertoken}`).then(res => res.json()).then(response => {
                    if (response["cod"] === "429") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> The weather api has been limited, please try again later.`).setColor(`Red`)] });
                    if (response["cod"] === "404") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid City/Location. Please type a invalid location.`).setColor(`Red`)] });
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
    
                    message.channel.send({ embeds: [new EmbedBuilder().setTitle(`There is ${currentTemp}\u00B0 C in ${cityName}, ${country}`).setDescription(`**Maximum Temperature:** ${maxTemp}\u00B0 C\n**Minimum Temperature:** ${minTemp}\u00B0 C\n**Humidity:** ${humidity}\n**Wind Speed:** ${wind}\n**Pressure:** ${pressure}\n**Cloudiness:** ${cloudness}`).setColor(`Blue`)] });
                })
            } catch {}
           }
        } else if (typeofcommand === "interaction"){
            let data = message.options.getString("city");

           if (data) {
            if (data.trim() === "") return message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid Country/City/Location. Please type a invalid location.`).setColor(`Red`)] });
            try {
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data}&units=metric&appid=${weathertoken}`).then(res => res.json()).then(response => {
                    if (response["cod"] === "429") return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> The weather api has been limited, please try again later.`).setColor(`Red`)] });
                    if (response["cod"] === "404") return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Invalid City/Location. Please type a invalid location.`).setColor(`Red`)] });
                    if (response["cod"] !== 200 && response["cod"] !== "404" && response["cod"] !== "429") return message.editReply({ embeds: [new EmbedBuilder().setDescription(`<:PoxError:1025977546019450972> Some thing went wrong with this command, please try again later.`).setColor(`Red`)] });
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
    
                    message.editReply({ embeds: [new EmbedBuilder().setTitle(`There is ${currentTemp}\u00B0 C in ${cityName}, ${country}`).setDescription(`**Maximum Temperature:** ${maxTemp}\u00B0 C\n**Minimum Temperature:** ${minTemp}\u00B0 C\n**Humidity:** ${humidity}\n**Wind Speed:** ${wind}\n**Pressure:** ${pressure}\n**Cloudiness:** ${cloudness}`).setColor(`Blue`)] });
                })
            } catch {}
           }
        }
    }
}