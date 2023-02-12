require('dotenv').config({path: "./settings.env"}); // load the env
const db = process.env.prefixdb;
const authkey = process.env.authdb;
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    set(key, value, callback) {
        if (db) {
            let bodyfetch = {
                "authorization": authkey,
                "key": key,
                "value": value
            }
            fetch(db + "/set", { method: "POST", body: JSON.stringify(bodyfetch), headers: { 'Content-Type': 'application/json' }}).then(res => res.json()).then(json => {
                if (json) {
                    if (json["status"] === false) return callback(false);
                    if (json["status"] === true) return callback(json);
                }
            })
        }
    },
    has(key, callback) {
        if (db) {
            let bodyfetch = {
                "authorization": authkey,
                "key": key
            }
            fetch(db + "/has", { method: "POST", body: JSON.stringify(bodyfetch), headers: { 'Content-Type': 'application/json' }}).then(res => res.json()).then(json => {
                if (json) {
                    if (json["status"] === false) return callback(false);
                    if (json["status"] === true) return callback(true);
                }
            })
        }
    },
    get(key, callback) {
        if (db) {
            let bodyfetch = {
                "authorization": authkey,
                "key": key
            }
            fetch(db + "/has", { method: "POST", body: JSON.stringify(bodyfetch), headers: { 'Content-Type': 'application/json' }}).then(res => res.json()).then(json => {
                if (json) {
                    if (json["status"] === false) return callback(false);

                    if (json["data"]) {
                        return callback(json["data"]);
                    } else {
                        return callback(undefined);
                    }
                }
            })
        }
    },
    delete(key, callback) {
        let bodyfetch = {
            "authorization": authkey,
            "key": key
        }
        if (db) {
            fetch(db + "/del", { method: "DELETE", body: JSON.stringify(bodyfetch), headers: { 'Content-Type': 'application/json' }}).then(res => res.json()).then(json => {
                if (json) {
                    if (json["status"] === false) return callback(false);
                    if (json ["status"] === true) return callback(json);
                }
            })
        }
    }
}