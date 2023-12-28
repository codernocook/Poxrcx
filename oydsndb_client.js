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

if(process.versions.node.split(".").map(Number)&&process.versions.node.split(".").map(Number)[0]&&process.versions.node.split(".").map(Number)[1]){const e=process.versions.node.split(".").map(Number);if(e[0]<18||e[1]<19)fetch=(...t)=>import("node-fetch").then(({"default":e})=>e(...t))}const u=e=>{try{JSON.parse(e)}catch{return false}return true};module.exports=function(f,s){return{set(t,n,i){try{if(f){let e={authorization:s,key:t,value:n};fetch(f+"/set",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(e=>e.text()).then(t=>{if(u(t)===true){let e=JSON.parse(t);if(e["status"]===false)if(i!==undefined&&i!==null)return i(false);if(e["status"]===true)if(i!==undefined&&i!==null)return i(e)}else if(u(t)===false){if(i!==undefined&&i!==null)return i({success:false,code:"cannot_connect_database"})}})}}catch{if(i!==undefined&&i!==null)return i(false)}},has(t,n){try{if(f){let e={authorization:s,key:t};fetch(f+"/has",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(e=>e.text()).then(t=>{if(u(t)===true){let e=JSON.parse(t);if(e["status"]===false)if(n!==undefined&&n!==null)return n(false);if(e["status"]===true)if(n!==undefined&&n!==null)return n(true)}else if(u(t)===false){if(n!==undefined&&n!==null)return n({success:false,code:"cannot_connect_database"})}})}}catch{if(n!==undefined&&n!==null)return n(false)}},get(t,n){try{if(f){let e={authorization:s,key:t};fetch(f+"/has",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(e=>e.text()).then(t=>{if(u(t)===true){let e=JSON.parse(t);if(e["status"]===false)if(n!==undefined&&n!==null)return n(false);if(e["data"]){if(n!==undefined&&n!==null)return n(e["data"])}else{if(n!==undefined&&n!==null)return n(undefined)}}else if(u(t)===false){if(n!==undefined&&n!==null)return n({success:false,code:"cannot_connect_database"})}})}}catch{if(n!==undefined&&n!==null)return n(undefined)}},getAll(n){let e={authorization:s,key:key};fetch(f+"/get",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(e=>e.text()).then(t=>{if(u(t)===true){let e=JSON.parse(t);if(e["status"]===false)if(n!==undefined&&n!==null)return n(false);if(e["data"]){if(n!==undefined&&n!==null)return n(e["data"])}else{if(n!==undefined&&n!==null)return n(undefined)}}else if(u(t)===false){if(n!==undefined&&n!==null)return n(undefined)}})},"delete"(t,n){try{let e={authorization:s,key:t};if(f){fetch(f+"/del",{method:"DELETE",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(e=>e.text()).then(t=>{if(u(t)===true){let e=JSON.parse(t);if(e["status"]===false)if(n!==undefined&&n!==null)return n(false);if(e["status"]===true)if(n!==undefined&&n!==null)return n(e)}else if(u(t)===false){if(n!==undefined&&n!==null)return n({success:false,code:"cannot_connect_database"})}})}}catch{if(n!==undefined&&n!==null)return n(false)}},clear(t,n,e){if(e&&typeof e==="object"&&Array.isArray(e)===false&&e["force"]===true){try{let e={authorization:s,key:t};if(f){fetch(f+"/clear",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then(e=>e.text()).then(t=>{if(u(t)===true){let e=JSON.parse(t);if(e["status"]===false)if(n!==undefined&&n!==null)return n(false);if(e["status"]===true)if(n!==undefined&&n!==null)return n(e)}else if(u(t)===false){if(n!==undefined&&n!==null)return n(undefined)}})}}catch{if(n!==undefined&&n!==null)return n(false)}}}}};