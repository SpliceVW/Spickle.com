const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CriticalPlugin = require('webpack-plugin-critical').CriticalPlugin;
const FaviconsPlugin = require('favicons-webpack-plugin');
//const SriPlugin = require('webpack-subresource-integrity');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const HtmlMinifierPlugin = require('html-minifier-webpack-plugin');


module.exports = merge(common, {
    mode: "production",
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new FaviconsPlugin({
            logo: './src/images/derek.png',
            prefix: 'favicons/icon[hash]',
            inject: true,
            emitStats: true,
            statsFilename: 'iconstats-[hash].json',
            title: 'Spickle.com'
        }),
        //        new SriPlugin(),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new HtmlMinifierPlugin({
            html5: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            processScripts: ["application/ld+json"],
            customAttrCollapse: /sizes/
        })
    ]
});



