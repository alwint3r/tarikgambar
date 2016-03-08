#!/usr/bin/env node
'use strict';

const http = require('http');
const https = require('https');
const url = require('url');
const path = require('path');
const fs = require('fs');
const commander = require('commander');

commander
    .version('0.1.0')
    .option('-u, --url [url]', 'Image source')
    .option('-o, --output [output]', 'Output file name')
    .parse(process.argv);

if (!commander.url) {
    console.error('Error: You need to specify image url');
    commander.outputHelp();

    return process.exit(1);
}

const parsedUrl = url.parse(commander.url);
const reqOptions = {
    hostname: parsedUrl.hostname,
    path: parsedUrl.path,
    protocol: parsedUrl.protocol,
    headers: {
        'Accept': 'image/png, image/jpeg, image/gif, image/webp',
    },
    method: 'GET',
};

let outputPath = commander.output;

if (!commander.output) {
    outputPath = reqOptions.path.split('/').slice(-1)[0];
}

outputPath = path.join(process.cwd(), outputPath);

const prot = reqOptions.protocol === 'https:' ? https : http;
const outputStream = fs.createWriteStream(outputPath);
const req = prot.request(reqOptions, res => {
    res.pipe(outputStream);
});

req.end();
