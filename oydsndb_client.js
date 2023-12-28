/*
    MIT License

    Copyright (c) 2023 itzporium

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

if(process.versions.node.split(".").map(Number)&&process.versions.node.split(".").map(Number)[0]&&process.versions.node.split(".").map(Number)[1]){const e=process.versions.node.split(".").map(Number);if(e[0]<18||e[1]<19)fetch=(...n)=>import("node-fetch").then(({"default":e})=>e(...n))}const r=e=>{try{JSON.parse(e)}catch{return false}return true};module.exports=function(u,f){return{set(n,t,i){try{if(u){let e={authorization:f,key:n,value:t};fetch(u+"/set",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(e=>e.text()).then(n=>{if(r(n)===true){let e=JSON.parse(n);if(e["status"]===false)if(i!==undefined&&i!==null)return i(false);if(e["status"]===true)if(i!==undefined&&i!==null)return i(e)}else if(r(n)===false){if(i!==undefined&&i!==null)return i(undefined)}})}}catch{if(i!==undefined&&i!==null)return i(undefined)}},has(n,t){try{if(u){let e={authorization:f,key:n};fetch(u+"/has",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(e=>e.text()).then(n=>{if(r(n)===true){let e=JSON.parse(n);if(e["status"]===false)if(t!==undefined&&t!==null)return t(false);if(e["status"]===true)if(t!==undefined&&t!==null)return t(true)}else if(r(n)===false){if(t!==undefined&&t!==null)return t(undefined)}})}}catch{if(t!==undefined&&t!==null)return t(undefined)}},get(n,t){try{if(u){let e={authorization:f,key:n};fetch(u+"/has",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(e=>e.text()).then(n=>{if(r(n)===true){let e=JSON.parse(n);if(e["status"]===false)if(t!==undefined&&t!==null)return t(null);if(e["data"]){if(t!==undefined&&t!==null)return t(e["data"])}else{if(t!==undefined&&t!==null)return t(null)}}else if(r(n)===false){if(t!==undefined&&t!==null)return t(undefined)}})}}catch{if(t!==undefined&&t!==null)return t(undefined)}},getAll(t){let e={authorization:f,key:key};fetch(u+"/get",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(e=>e.text()).then(n=>{if(r(n)===true){let e=JSON.parse(n);if(e["status"]===false)if(t!==undefined&&t!==null)return t(null);if(e["data"]){if(t!==undefined&&t!==null)return t(e["data"])}else{if(t!==undefined&&t!==null)return t(null)}}else if(r(n)===false){if(t!==undefined&&t!==null)return t(undefined)}})},"delete"(n,t){try{let e={authorization:f,key:n};if(u){fetch(u+"/delete",{method:"DELETE",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(e=>e.text()).then(n=>{if(r(n)===true){let e=JSON.parse(n);if(e["status"]===false)if(t!==undefined&&t!==null)return t(false);if(e["status"]===true)if(t!==undefined&&t!==null)return t(e)}else if(r(n)===false){if(t!==undefined&&t!==null)return t(undefined)}})}}catch{if(t!==undefined&&t!==null)return t(undefined)}},clear(n,t,e){if(e&&typeof e==="object"&&Array.isArray(e)===false&&e["force"]===true){try{let e={authorization:f,key:n};if(u){fetch(u+"/clear",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(e=>e.text()).then(n=>{if(r(n)===true){let e=JSON.parse(n);if(e["status"]===false)if(t!==undefined&&t!==null)return t(false);if(e["status"]===true)if(t!==undefined&&t!==null)return t(e)}else if(r(n)===false){if(t!==undefined&&t!==null)return t(undefined)}})}}catch{if(t!==undefined&&t!==null)return t(undefined)}}}}};