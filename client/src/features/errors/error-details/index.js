import './error-details.styl';

import angular from 'angular';

import errorDetails from './error-details';

export default angular.module('ErrorDetails', [])
	.directive('errorDetails', errorDetails)
	.name;
