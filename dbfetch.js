require('dotenv').config({path: "./settings.env"}); // load the env
const db = toString(process.env.db);
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    set(key, value) {
        if (db) {
            fetch(process.env.db + "/set", { method: "POST", body: { "key": key, "value": value }, headers: { 'Content-Type': 'application/json' }}).then(res => res.json()).then(json => {
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
                    if (json ["status"] === true) return json["data"];
                }
            })
        }
    },
    delete(key) {
        if (db) {
            fetch(process.env.db + "/del", { method: "DELETE", body: { "key": key }, headers: { 'Content-Type': 'application/json' }}).then(res => res.json()).then(json => {
                if (json) {
                    if (json["status"] === false) return false;
                    if (json ["status"] === true) return json;
                }
            })
        }
    }
}