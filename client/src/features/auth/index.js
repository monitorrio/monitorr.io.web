import './auth.styl';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './auth.routes';
import auth from './auth';

export default angular.module('Auth', [uirouter])
	.config(routing)
	.directive('auth', auth)
	.name;
