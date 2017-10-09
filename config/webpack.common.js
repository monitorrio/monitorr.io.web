'use srict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');

var root = helpers.root('client', 'src');
var distFolder = helpers.root('dist');

module.exports = {
	context: root,
	devtool: 'eval',
	entry: [path.join(root, 'app.js')],
	output: {
		path: distFolder,
		filename: '[name]-[hash].js',
		publicPath: '/'
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin('[name]-[hash].css', {disable: false}),
		new HtmlWebpackPlugin({
			template: path.join(root, 'index.html'),
			inject: 'body',
			filename: 'index.html',
			minify: false
		}),
		new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery'})
	],
	module: {
		noParse: [/node_modules\/sinon\//],
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel?presets[]=es2015',
				exclude: [/node_modules|bower_components|vendor|EventManager|atlas/, /\.spec\.js$/]
			}, {
				test: /\.(jpe?g|png|gif|svg|eot|woff(2)?|ttf|svg)(\?[-a-z0-9=\.]+)?$/,
				loader: 'file?name=[path][name].[ext]&context=' + path.join(root, 'assets')
			}, {
				test: /\.html$/,
				loader: 'raw'
			}, {
				test: /\.json?$/,
				loader: 'json'
			}, {
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
			}, {
				test: /\.styl/,
				loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!stylus')
			}
		]
	},
	postcss: [autoprefixer({browsers: ['last 2 version']})]
};
