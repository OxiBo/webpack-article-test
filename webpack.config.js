const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

let config = {
    entry: [
       'babel-polyfill', './src/index.js'
    ],

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },
        {
            test: /\.scss$/,
            use: [ 'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
        }
        // {
        //     test: /\.scss$/,
        //     use: ExtractTextPlugin.extract(
        //     {
        //         fallback: 'style-loader',
        //         use: ['css-loader', 'sass-loader']
        //     })
        // }
        ]
    },
    devServer: {
        overlay: true
    },
    plugins: [
    // new CleanWebpackPlugin('dist', {} ),
    // new ExtractTextPlugin({
    //     filename: 'styles.css'
    // }),

    new MiniCssExtractPlugin({
        filename: 'styles.css'
    }),
    new HtmlWebpackPlugin({
        inject: false,
        hash: true,
        template: './src/index.html',
        filename: 'index.html'
    })
    ]

};

module.exports = (env, options) => {
// depending on the mode (production or development build config object and set devtool to see which part(file) has an error more accurately)
    let production = options.mode === "production";

    config.devtool = production ? false : "eval-sourcemap"; // it is possible instead of false write 'source-map' but it this case the code will be accessible in console.
    // console.log(options)
    return config;

};
