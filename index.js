'use strict';

const Promise = require('bluebird');
const url = require('url');
const path = require('path');
const fs = require('fs');
const makeRequest = require('./helper/makeRequest');
const validateOpts = require('./helper/validateOptions');

exports.pull = function pull(options, callback) {
    try {
        validateOpts(options);
    } catch (ex) {
        return callback(ex);
    }

    const parsedUrl = url.parse(options.url);

    if (!options.outputType) {
        // default to `stream`

        return makeRequest(parsedUrl, callback);
    }

    if (options.outputType === 'file') {
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
                stream.pipe(fs.createWriteStream(outputPath), { end: false });

                stream.on('end', () => callback(null, outputPath));
                stream.on('error', callback);
            });
        });
    }
};

exports.pullAsync = Promise.promisify(exports.pull);
