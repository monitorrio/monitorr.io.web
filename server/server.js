var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var history = require('connect-history-api-fallback');

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

var config = require('./config.json');
const webpackConfig = require('../webpack.config.js');

var isDeveloping = false;

if (process.env.NODE_ENV === 'development') {
	isDeveloping = true;
}

if (isDeveloping) {
	const compiler = webpack(webpackConfig);

	const middleware = webpackMiddleware(compiler, {
		publicPath: webpackConfig.output.publicPath,
		contentBase: 'src',
		stats: {
			colors: true,
			hash: false,
			timings: true,
			chunks: false,
			chunkModules: false,
			modules: false
		}
	});

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(history());

	app.use(middleware);
	app.use(webpackHotMiddleware(compiler));

	app.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();
	});

	app.get('/', function response(req, res) {
		res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
		res.end();
	});
	start();
} else {
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(history());
	var indexPath = path.join(__dirname, '/../dist');
	app.use(express.static(indexPath));

	start();
}

function start() {
	var config = getConfig();
	http.createServer(app).listen(config.port, config.host, function () {
		var baseUrl = 'http://' + config.host + ':' + config.port;
		app.emit('started', baseUrl);
		console.log('dev server listening @ %s%s', baseUrl, '/');
	});
}

function getConfig() {
	if (process.env.PORT) {
		return process.env.PORT;
	}

	if (process.env.NODE_ENV === 'staging') {
		return config.staging;
	} else if (process.env.NODE_ENV === 'production') {
		return config.production;
	} else {
		return config.development;
	}
}
