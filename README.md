# Tarikgambar

Simple image download command line tool & module for node.js. Supports `image/png`, `image/gif`, `image/jpeg`, `image/webp` types.

Tested with Node v4 and v6.

## Installing

#### As command-line tool

```sh
npm install -g tarikgambar
```

#### As regular module

```sh
npm install tarikgambar
```

## Breaking changes from v0 to v1

* Removed `outputDir` and `filename` from configuration object. You should use `outputPath` instead.

## Configuration
* `url`: (*String*) - URL of the target image file.
* `outputType`: (*String*) - This value should be either `stream` or `file`. Default to `stream` if not defined.
* `outputPath`: (*String*) - Path to the output file, will fail if the directory is not exists. This field is not used if `outputType` is `stream`.

## API

#### tarikgambar.pull(options, callback)

Call callback on completition with error or value that contains path to a file or response stream depending on `options.outputType` value.

Parameters:

* `options`: (*Object*) - Download configuration.
* `callback`: (*Function(Error, String|Response*) - Callback function to be called on completition.

Example 1 (stream):
```js
tarikgambar.pull({ url: 'http://example.com/path/to/some/image.png' }, (err, response) => {
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
```js
const options = {
    url: 'http://example.com/path/to/some/image.png',
    outputType: 'file',
    outputPath: '/home/winter/downloaded.png',
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
```js
tarikgambar.pullAsync({ url: 'http://example.com/path/to/some/image.png' }).then(response => {
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
```js
const options = {
    url: 'http://example.com/path/to/some/image.png',
    outputType: 'file',
    outputPath: '/home/winter/downloaded.png',
};

tarikgambar.pullAsync({ url: 'http://example.com/path/to/some/image.png' }).then(path => {
    console.log('The image file is saved to: ', path);
})
.catch(err => {
    // handle error
});
```
