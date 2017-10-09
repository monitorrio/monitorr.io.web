const webpack = require('webpack');
const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = webpackMerge.smart(commonConfig, {
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('staging'),
				'API_URL': JSON.stringify('https://staging-api.monitorr.io/api')
			},
			AUTH_REDIRECTURL: '\'https://staging-admin.monitorr.io/login\'',
			AUTH0_CLIENT_ID: '\'2YUcbwH2ypc7LZ56HscwhJmgAy6UOeVb\'',
			AUTH0_DOMAIN: '\'greystatsllc.auth0.com\'',
			BASE_API: '\'https://staging-api.monitorr.io/api\'',
			AUTH0_SIGNUP_URL: '\'https://greystatsllc.auth0.com/dbconnections/signup\'',
			AUTH0_DB_CONNECTION:'\'Username-Password-Authentication\''
		})
	]
});
