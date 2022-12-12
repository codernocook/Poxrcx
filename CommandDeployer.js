// this is an script to make other work use deploy() function
// deploy(commandinfo) to deploy
// this module will make the bot command appear forever don't need old deploy method (anti deploy bypass)

// require the eris client
/* The bot deploy docs
    const send = {
        ["name"]
        ["description"]
        ["option"]
    }
*/

const { Options } = require('discord.js')
const { CommandClient } = require('eris')
const token = process.env.token // put the bot token here or change the env name
const DeployerClient = new CommandClient(`Bot ${token}`, { intents: ['guilds'], maxShards: 'auto',restMode: true })

async function deployprocess(info) {
    // Register the discord command, forever
    DeployerClient.on('ready', async () => {
        await DeployerClient.bulkEditCommands([{
            "name": info["name"],
            "description": info["description"],
            "options": info["options"],
            "type": 1
        }])
    })
    DeployerClient.connect();
}

const tokenFromStupidCommand = process.argv[2]

module.exports = {
    deploy(info) {
        deployprocess(info)
    }
}
