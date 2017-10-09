// import '../styles/layout-page.styl';
import './log.styl';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './log.routes';
import log from './log';

export default angular.module('Log', [uirouter])
	.config(routing)
	.directive('log', log)
	.name;
