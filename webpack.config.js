import path from 'path';

export default {
    mode: 'production',
    entry: './index.js',
    output: {
        path: path.resolve('./dist'),
        filename: 'index.min.js',
        globalObject: 'this',
        library: {
            type: "umd"
        }
    },
};