const path = require('path');

module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.min.js',
        globalObject: 'this',
        library: {
            type: "umd"
        }
    },
};