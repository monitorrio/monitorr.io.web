/**
 * @author: @AngularClass
 */
const webpack = require('webpack');
const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

module.exports = webpackMerge.smart(commonConfig, {
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			mangle: true,
			compress: {
				warnings: false
			},
			sourceMap: false
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production'),
				'API_URL': JSON.stringify('https://api.monitorr.io/api')
			},
			AUTH_REDIRECTURL: '\'https://admin.monitorr.io/login\'',
			AUTH0_CLIENT_ID:'\'CtUKQmJQmNpUcmiFp4thDi5BLkZb9062\'' ,
			AUTH0_DOMAIN: '\'monitorr.auth0.com\'',
			BASE_API: '\'https://api.monitorr.io/api\'',
			AUTH0_SIGNUP_URL: '\'https://monitorr.auth0.com/dbconnections/signup\'',
			AUTH0_DB_CONNECTION:'\'Username-Password-Authentication\''
		})
	]
});
