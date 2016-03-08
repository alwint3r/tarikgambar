'use strict';

module.exports = function validateOptions(options) {
    if (!options.url) {
        throw new Error('You need to specify image url');
    }

    if (options.outputType &&
        (options.outputType !== 'stream' && options.outputType !== 'file')) {

        throw new Error('Output type should be either `stream` or `file`');
    }

    if (options.outputType === 'file') {
        if (!options.outputDir) {
            throw new Error('Path to output directory should be defined');
        }
    }
};
