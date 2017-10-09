// Look in ./config folder for webpack.dev.js
console.log('Webpack NODE_ENV', process.env.NODE_ENV);
switch (process.env.NODE_ENV) {
	case 'production':
		console.log('Webpack production');
		module.exports = require('./config/webpack.production');
		break;
	case 'staging':
		console.log('Webpack staging');
		module.exports = require('./config/webpack.staging');
		break;
	case 'development':
		console.log('Webpack development');
		module.exports = require('./config/webpack.dev');
		break;
	default:
		module.exports = require('./config/webpack.dev');
}
