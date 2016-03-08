# Tarikgambar

Simple image download command line tool & module for node.js. Supports `image/png`, `image/gif`, `image/jpeg` types.

Tested with Node v4.x.x.

## Installing

#### As command-line tool

```sh
npm install -g tarikgambar
```

#### As regular module

```sh
npm install tarikgambar
```

## Configuration
* `url`: (*String*) - URL of the target image file.
* `outputType`: (*String*) - This value should be either `stream` or `file`. Default to `stream` if not defined.
* `outputDir`: (*String*) - Path to the download directory. This field is not used if `outputType` is `stream`.
* `filename`: (*String*) - Name of the downloaded file. Default to original file name. This field is not used if `outputType` is `stream`.

## API

#### tarikgambar.pull(options, callback)

Call callback on completition with error or value that contains path to a file or response stream depending on `options.outputType` value.

Parameters:

* `options`: (*Object*) - Download configuration.
* `callback`: (*Function(Error, String|Response*) - Callback function to be called on completition.

Example 1 (stream):
```
tarikgambar.pull({ url: 'http://placeimg.com/300/300/people' }, (err, response) => {
    if (err) {
        // handle error
    }

    // write stream to file or send it to browser.
    response.on('data', chunk => {
        // do something.
    });
});
```

Example 2 (path):
```
const options = {
    url: 'http://placeimg.com/300/300/people',
    outputType: 'file',
    outputDir: '/home/winter/',
    outputname: 'downloaded.png',
};

tarikgambar.pull(options, (err, path) => {
    if (err) {
        // handle error
    }

    console.log('The image file is saved to ', path);
});
```

#### tarikgambar.pullAsync(options) -> Promise<String|Response>

Return promise that will be rejecter or resolve to either path to a file or response stream depending on `options.outputType` value.

Example 1 (stream):
```
tarikgambar.pullAsync({ url: 'http://placeimg.com/300/300/people' }).then(response => {
    // write stream to a file or send it to browser.
    response.on('data', chunk => {
        // do something.
    });
})
.catch(err => {
    // handle error
});
```

Example 2 (path):
```
const options = {
    url: 'http://placeimg.com/300/300/people',
    outputType: 'file',
    outputDir: '/home/winter/',
    outputname: 'downloaded.png',
};

tarikgambar.pullAsync({ url: 'http://placeimg.com/300/300/people' }).then(path => {
    console.log('The image file is saved to: ', path);
})
.catch(err => {
    // handle error
});
```
