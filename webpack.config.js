const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CriticalPlugin = require('webpack-plugin-critical').CriticalPlugin;
const FaviconsPlugin = require('favicons-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const HtmlWebpackInlineSVGPlugin = require('webpack-html-plugin-svg-inline');


const plugins = [
    new HtmlWebpackPlugin({
        title: 'Spickle.com',
        template: 'index.html',
        filename: 'index.html'
    }),
    new HtmlWebpackInlineSVGPlugin()
];


module.exports = {
    context: __dirname,
    entry: './src/index.ts',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    'file-loader'
                ]
            },
            { test: /\.html$/,
              use: [{
                  loader: 'html-loader',
                  options: {
                      interpolate: true,
                      attrs: ['img:src', 'source:srcset']
                  }
                }]}
        ]
    },
    devServer: {
        contentBase: './dist'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: this.mode === 'production' ?
    [
        new CleanWebpackPlugin(['dist']),
        ...plugins,
        new FaviconsPlugin({
            logo: './src/images/derek.png',
            prefix: 'favicons/icon[hash]',
            inject: true,
            emitStats: true,
            statsFilename: 'iconstats-[hash].json',
            title: 'Spickle.com'
        }),
        new SriPlugin()
    ] 
    : plugins
};