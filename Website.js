const express = require('express');
const server = express();

server.all(`/`, (req, res) => {
    res.send(`{Status:Working}`);
});

function keepAlive() {
    server.listen(3000, () => {
        console.log(`Webchecker is running! | ` + Date.now());
    });
}

module.exports = keepAlive;
