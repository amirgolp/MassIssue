import fetch from 'node-fetch';
import fs from "fs";

const TOKEN = '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';
const user = 'amirgolp';
const repo = 'Wordle';

const csv = fs.readFileSync("issues - Copy.csv")

var array = csv.toString().split("\r");

let result = [];

let headers = array[0].split(",")
headers[0] = headers[0].substring(1);

for (let i = 1; i < array.length - 1; i++) {
    let obj = {}

    let str = array[i]
    const [hdr, ...body] = str.split(',');
    obj[headers[0]] = hdr.substring(1);
    obj[headers[1]] = `${body[0]} 
    
${body[1]}`;


    result.push(obj)
}

let createIssueFromJSON = function(file) {
    file.forEach(issue => {
        fetch(`https://api.github.com/repos/${user}/${repo}/issues`, {
            method: 'post',
            body:    JSON.stringify(issue),
            headers: {'Content-Type': 'application/json', 'Authorization': `token ${TOKEN}`}
        })
        .then(res => res.json())
        .then(json => {
            if (json.Status == 201) {
                console.log(`Issue created at ${json.status.Location}`)
            }
            else {
                console.log(`Something went wrong. Response: ${JSON.stringify(json)}`)
            }
        });
    })
}

createIssueFromJSON(result);