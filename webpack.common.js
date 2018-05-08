const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('webpack-html-plugin-svg-inline');


const plugins = [

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
    plugins: [    new HtmlWebpackPlugin({
        title: 'Spickle.com',
        template: 'index.html',
        filename: 'index.html'
    }),
    new HtmlWebpackInlineSVGPlugin()
    ] 
};