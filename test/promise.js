'use strict';

const assert = require('assert');
const fs = require('fs');
const tarikgambar = require('../').pullAsync;

describe('tarikgambar.pullAsync(options) -> Promise', function () {
    it('Should return rejected promise if url is not defined', function (done) {
        tarikgambar().catch(err =>  {
            assert(err);
            done();
        });
    });

    describe('options.outputType === file', function() {
        this.timeout(30000);

        it('Should return rejected promise if outputDir is not defined', function (done) {
            const opt = {
                url: 'http://placeimg.com/32/32',
                outputType: 'file',
            };

            tarikgambar(opt).catch(err => {
                assert(err);
                done();
            });
        });

        it('Should return rejected promise if outputDir is not found', function (done) {
            const opt = {
                url: 'http://placeimg.com/32/32',
                outputType: 'file',
                outputDir: '/home/NotFound',
            };

            tarikgambar(opt).catch(err => {
                assert(err);
                done();
            });
        });

        it('Should resolve promise with path to downloaded file', function (done) {
            const opt = {
                url: 'http://placeimg.com/32/32',
                outputType: 'file',
                outputDir: __dirname,
                filename: 'downloaded.png',
            };

            tarikgambar(opt).then(path => {
                assert(path);
                assert(fs.existsSync(path));

                fs.unlinkSync(path);
                done();
            });
        });
    });

    describe('options.outputType === stream ', function () {
        it('Should return resolved promise with stream', function () {
            const opt = {
                url: 'http://placeimg.com/64/64/people',
                outputType: 'stream',
            };

            tarikgambar(opt).then(stream => {
                // Naive test.
                assert(stream);
                assert(typeof stream.on === 'function');
                done();
            });
        });

        it('Should return resolved promise with streaim if outputType is undefined', function () {
            const opt = {
                url: 'http://placeimg.com/64/64/people',
            };

            tarikgambar(opt).then(stream => {
                // Naive test.
                assert(stream);
                assert(typeof stream.on === 'function');
                done();
            });
        });
    })
});
