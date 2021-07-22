const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode:"development",
    entry:{
        main: "./js/index.js"
    },
    output:{
        path:path.resolve(__dirname, 'public'),
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
                use: [{
                    // inject CSS to page
                    loader: 'style-loader'
                  }, {
                    // translates CSS into CommonJS modules
                    loader: 'css-loader'
                  }, {
                    // Run postcss actions
                    loader: 'postcss-loader',
                    options: {
                      // `postcssOptions` is needed for postcss 8.x;
                      // if you use postcss 7.x skip the key
                      postcssOptions: {
                        // postcss plugins, can be exported to postcss.config.js
                        plugins: function () {
                          return [
                            require('autoprefixer')
                          ];
                        }
                      }
                    }
                }, {
                    // compiles Sass to CSS
                    loader: 'sass-loader'
                }
                ]
            
            },
            
            {
                test: /\.pug$/,
                use: [
                    'html-loader',
                    'pug-html-loader'
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        }
                    },
                
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4000,
                            name: '[name].[ext]',
                            esModule: false
                        }
                    }
                ]
            }
            
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'pug/index.pug'),
            filename: 'index.html'
          }),
        
        
    ],
    
    devServer: {
        inline: true,
        hot: true,
        
    },
    
    
};