/**
 * @author: @AngularClass
 */
var webpack = require('webpack');
var webpackMerge = require('webpack-merge'); // used to merge webpack configs
var commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = webpackMerge.smart(commonConfig, {
	entry: ['webpack-hot-middleware/client?reload=true'],
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			AUTH_REDIRECTURL: '\'http://localhost:8002/login\'',
			AUTH0_CLIENT_ID: '\'2YUcbwH2ypc7LZ56HscwhJmgAy6UOeVb\'',
			AUTH0_DOMAIN: '\'greystatsllc.auth0.com\'',
			BASE_API: '\'http://localhost:18000/api\'',
			AUTH0_SIGNUP_URL: '\'https://greystatsllc.auth0.com/dbconnections/signup\'',
			AUTH0_DB_CONNECTION:'\'Username-Password-Authentication\''
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('dev'),
				'API_URL': JSON.stringify('http://localhost:8000/api')
			}
		})
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel?presets[]=es2015!jshint!eslint',
				exclude: [/node_modules|bower_components|vendor|EventManager|atlas/, /\.spec\.js$/]
			}
		]
	}
});
