'use strict';

module.exports = function validateOptions(options) {
    if (!options.url) {
        return { error: new Error('You need to specify image url') };
    }

    if (options.outputType &&
        (options.outputType !== 'stream' && options.outputType !== 'file')) {

        return { error: new Error('Output type should be either `stream` or `file`') };
    }

    if (options.outputType === 'file') {
        if (!options.outputPath) {
            return { error: new Error('Path to output file should be defined') };
        }
    }

    return { error: false };
};
