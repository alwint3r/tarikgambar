'use strict';

const Promise = require('bluebird');
const url = require('url');
const path = require('path');
const fs = require('fs');
const makeRequest = require('./helper/makeRequest');
const validateOpts = require('./helper/validateOptions');

function pathFromStream(options, stream, callback) {
    stream.pipe(fs.createWriteStream(options.outputPath), { end: false });
    stream.on('end', () => callback(null, options.outputPath));
    stream.on('error', callback);
}

function pull(options,callback) {
    const validationResult = validateOpts(options);
    if (validationResult.error) {
        return callback(validationResult.error);
    }

    const parsedUrl = url.parse(options.url);

    if (!options.outputType || options.outputType === 'stream') {
        return makeRequest(parsedUrl, callback);
    }

    if (options.outputType === 'file') {
        const outputDir = path.dirname(options.outputPath);

        return fs.stat(outputDir, (err, stat) => {
            if (err) {
                return callback(err);
            }

            return makeRequest(parsedUrl, (err, stream) => {
                if (err) {
                    return callback(err);
                }

                return pathFromStream(options, stream, callback);
            });
        });
    }
}

module.exports = {
    pull,
    pullAsync: Promise.promisify(pull),
};
