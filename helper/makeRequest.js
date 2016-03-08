'use strict';

const http = require('http');
const https = require('https');

module.exports = function downloadImg(options, callback) {
    const reqOptions = {
        hostname: options.hostname,
        path: options.path,
        protocol: options.protocol,
        headers: {
            'Accept': 'image/png, image/jpeg, image/gif, image/webp',
        },
        method: 'GET',
    };

    const protocol = options.protocol === 'https:' ? https : http;
    const request = protocol.request(reqOptions, response => {
        response.on('error', callback);

        return callback(null, response);
    });

    request.on('error', callback);
    request.end();
};
