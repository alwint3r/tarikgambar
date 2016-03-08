'use strict';

const assert = require('assert');
const fs = require('fs');
const tarikgambar = require('../').pull;

describe('tarikgambar.pull(options, callback)', function() {
    it('Should call callback with error if url is not defined', function (done) {
        tarikgambar({ outputType: 'file' }, err => {
            assert(err);
            done();
        });
    });

    describe('options.outputType === file', function() {
        this.timeout(30000);

        it('Should call callback with error if outputDir is not defined', function (done) {
            const opt = {
                outputType: 'file',
                url: 'http://placeimg.com/64/64/people',
            };

            tarikgambar(opt, err => {
                assert(err);
                done();
            });
        });

        it('Should call callback with error if outputDir is not found', function (done) {
            const opt = {
                outputType: 'file',
                outputDir: '/home/notfound',
                url: 'http://placeimg.com/64/64/people',
            };

            tarikgambar(opt, err => {
                assert(err);
                done();
            });
        });

        it('Should call callback with path to downloaded file', function (done) {
            const opt = {
                outputType: 'file',
                outputDir: __dirname,
                filename: 'downloaded.png',
                url: 'http://placeimg.com/64/64/people',
            };

            tarikgambar(opt, (err, path) => {
                assert.ifError(err);
                assert(path);

                assert(fs.existsSync(path));
                fs.unlinkSync(path);

                done();
            });
        });
    });

    describe('options.outputType === undefined || options.outputType === stream', function() {
        this.timeout(30000);

        it('Should return callback with stream by default if outputType is undefined', function (done) {
            const opt = {
                url: 'http://placeimg.com/64/64/people',
            };

            tarikgambar(opt, (err, stream) => {
                // Naive test.
                assert(stream);
                assert(stream.on);
                done();
            });
        });
    });
});
