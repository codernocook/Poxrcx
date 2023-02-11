require('dotenv').config({path: "./settings.env"}); // load the env
const db = toString(process.env.db);
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    set(key, value) {
        if (db) {
            let bodyfetch = {
                "key": toString("key"),
                "value": value
            }
            fetch(process.env.db + "/set", { method: "POST", body: bodyfetch, headers: { 'Content-Type': 'application/json' }}).then(res => res.json()).then(json => {
                if (json) {
                    if (json["status"] === false) return false;
                    if (json ["status"] === true) return json;
                }
            })
        }
    },
    has(key) {
        if (db) {
            fetch(process.env.db + "/get", { method: "GET", headers: { 'Content-Type': 'application/json' }}).then(res => res.json()).then(json => {
                if (json) {
                    if (json["status"] === false) return false;

                    if (json["status"] === true) {
                        if (json["data"] && json["data"][key]) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            })
        }
    },
    get(key, value) {
        if (db) {
            fetch(process.env.db + "/get", { method: "GET", headers: { 'Content-Type': 'application/json' }}).then(res => res.json()).then(json => {
                if (json) {
                    if (json["status"] === false) return false;

                    if (json["status"] === true) {
                        if (json["data"] && json["data"][key]) {
                            return json["data"][key]["value"];
                        } else {
                            return json["data"][key]["value"];
                        }
                    }
                }
            })
        }
    },
    delete(key) {
        let bodyfetch = {
            "key": toString("key")
        }
        if (db) {
            fetch(process.env.db + "/del", { method: "DELETE", body: bodyfetch, headers: { 'Content-Type': 'application/json' }}).then(res => res.json()).then(json => {
                if (json) {
                    if (json["status"] === false) return false;
                    if (json ["status"] === true) return json;
                }
            })
        }
    }
}