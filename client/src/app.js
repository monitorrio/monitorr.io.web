// import 'jquery';
import angular from 'angular';

import uirouter from 'angular-ui-router';
import angularAnimate from 'angular-animate';
import angularAria from 'angular-aria';
import ngMessages from 'angular-messages';

import auth0 from 'auth0-angular';
import jwtHelper from 'angular-jwt';

import 'highlight.js';
import hljs from 'angular-highlightjs';
import 'highlight.js/styles/darkula.css';

import daterangepicker from 'angular-daterangepicker';
import 'daterangepicker';
import 'daterangepicker/daterangepicker.css';

import './features/atlas/js/plugins/datatables/jquery.dataTables.js';
import './features/atlas/js/plugins/datatables/dataTables.bootstrap.js';
import './features/atlas/js/plugins/datatables/dataTables.bootstrap.css';
import './features/atlas/js/plugins/datatables/extensions/Responsive/css/dataTables.responsive.css';
import './features/atlas/js/plugins/datatables/extensions/Responsive/js/dataTables.responsive.min.js';
import './features/atlas/js/plugins/datatables/extensions/Scroller/js/dataTables.scroller.min';

import 'angular-material/angular-material.css';
import 'font-awesome/css/font-awesome.css';

import 'angular-ui-grid/ui-grid.min.js';
import 'angular-ui-grid/ui-grid.min.css';

// atlas css
import 'bootstrap/dist/css/bootstrap.css';
import '../../node_modules/ng-sortable/dist/ng-sortable.css';
import './features/atlas/css/jquery-jvectormap-1.2.2.css';
import './features/atlas/css/aos.css';
import './features/atlas/css/styles.css';


// atlas js
import './features/atlas/js/plugins/aos/aos.js';
import './features/atlas/js/custom/offcanvas.js';
import './features/atlas/js/custom/box.js';
import './features/atlas/js/custom/tree-menu.js';
import './features/atlas/js/main.js';

import angularMaterial from 'angular-material';
import angularMaterialIcons from 'angular-material-icons';
import localStorageModule from 'angular-local-storage';
import colorPicker from './features/directives/color-picker';
import ngSweetAlert from 'angular-h-sweetalert';
import 'angular-timeago';
import 'sweetalert/dist/sweetalert.css';
import ngChart from 'angular-chart.js';
import bModal from 'angular-ui-bootstrap/src/modal';
import 'ng-sortable';

import routing from './app.config';
import filters from './features/filters';
import appInit from './app.init';
import appRun from './app.run';

import directives from './features/directives';
import services from './features/services';
import main from './features/main';
import auth from './features/auth';
import dash from './features/dash';
import navbar from './features/navbar';
import newErrors from './features/navbar/new-errors';
import sidenav from './features/sidenav';
import loader from './features/loader';
import appfooter from './features/appfooter';
import login from './features/login';
import signup from './features/signup';
import resetPassword from './features/reset-password';
import httpInitializer from './features/http';
import quickAddLogin from './features/log/quickAddLog';
import widgetLog from './features/log/widgetLog';
import treeLog from './features/log/tree-log';
import log from './features/log';
import logOverview from './features/log/overview';
import doubleBar from './features/log/overview/double-bar';
import errorAggregate from './features/log/overview/error-aggregate';
import errorRecent from './features/log/overview/error-recent';
import settings from './features/log/settings';
import errors from './features/errors';
import users from './features/log/users';
import profile from './features/profile';
import errorDetails from './features/errors/error-details';

//custom css
import './features/styles/index.styl';

angular.module('app', [
	uirouter,
	angularMaterial,
	angularMaterialIcons,
	angularAnimate,
	angularAria,
	localStorageModule,
	httpInitializer,
	ngMessages,
	hljs,
	daterangepicker,

	auth0,
	jwtHelper,
	colorPicker,

	bModal,
	errors,
	users,
	ngSweetAlert,
	'yaru22.angular-timeago',
	ngChart,
	'as.sortable',

	/* angular-ui-grid */
	'ui.grid',
	'ui.grid.pinning',
	'ui.grid.resizeColumns',
	'ui.grid.selection',
	'ui.grid.exporter',
	'ui.grid.autoResize',
	'ui.grid.cellNav',
	'ui.grid.edit',
	'ui.grid.rowEdit',

	filters,
	directives,
	services,

	main,
	auth,
	dash,
	log,
	settings,
	navbar,
	newErrors,
	sidenav,
	loader,
	appfooter,
	login,
	signup,
	resetPassword,
	quickAddLogin,
	widgetLog,
	treeLog,
	logOverview,
	doubleBar,
	errorAggregate,
	errorRecent,
	profile,
	errorDetails

]).constant('EVENTS', {})
	.config(routing)
	.config(appInit)
	.filter('formattedDateTime', [
		'$filter',
		function ($filter) {
			return function (input, format) {
				return (new Date(input), '12/01/2016');
			};
		}
	]).run(appRun);
