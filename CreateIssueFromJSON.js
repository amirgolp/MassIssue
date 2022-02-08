// const fetch = require('node-fetch');
// require('dotenv').config();
// import './Issues.json';
import fetch from 'node-fetch';
// const axios = require ('axios'); 
const TOKEN = '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';
const file = [
    {
      "title": "Kommunal direkt ",
      "body": `vub:mag:00439942 
      https://www.kommunaldirekt.de/kd-magazin-2/ausgaben-archiv/`
    },
    {
      "title": "Die Kommunale  ",
      "body": "vub:mag:00439943 https://sgk.nrw/publikationen/die-kommunale"
    }
   ]

const user = 'amirgolp';
const repo = 'Wordle';

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

createIssueFromJSON(file);