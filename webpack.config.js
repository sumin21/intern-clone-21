const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:"development",
    entry:{
        main: "./source/index.js"
    },
    output:{
        path:path.resolve(__dirname, "public"),
        filename:'index_bundle.js'
    },
    
    module:{
        rules: [
            {
                test: /\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /(\.scss|\.sass)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.pug$/,
                use: [
                    'pug-html-loader'
                ]
            }
        ]
    },
    
};