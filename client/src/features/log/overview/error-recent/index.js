import './error-recent.styl';

import angular from 'angular';

import component from './error-recent';

export default angular.module('ErrorRecent', [])
	.directive('errorRecent', component)
	.name;
