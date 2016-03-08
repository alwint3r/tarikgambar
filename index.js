'use strict';

const url = require('url');
const path = require('path');
const fs = require('fs');
const makeRequest = require('./helper/makeRequest');

module.exports = function downloadImage(options, callback) {
    if (!options.url) {
        return callback(new Error('You need to specify image url'));
    }

    const parsedUrl = url.parse(options.url);

    if (!options.outputType) {
        options.outputType = 'stream';

        return makeRequest(parsedUrl, callback);
    }

    if (options.outputType === 'file') {
        if (!options.outputDir) {
            return callback(new Error('Output file directory path must be given'));
        }

        if (!options.filename) {
            options.filename = parsedUrl.path.split('/').slice(-1)[0];
        }

        return fs.stat(options.outputDir, (err, stat) => {
            if (err) {
                return callback(err);
            }

            if (!stat) {
                return callback(err);
            }

            return makeRequest(parsedUrl, (err, stream) => {
                if (err) {
                    return callback(err);
                }

                const outputPath = path.join(options.outputDir, options.filename);
                stream.pipe(fs.createWriteStream(outputPath));

                return callback(null, outputPath);
            });
        });
    }
};
