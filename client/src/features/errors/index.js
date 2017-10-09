import './errors.styl';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import errors from './errors';

export default angular.module('Errors', [uirouter])
	.directive('errors', errors)
	.name;
