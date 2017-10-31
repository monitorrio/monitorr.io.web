import './error-info.styl';

import angular from 'angular';

import component from './error-info';

export default angular.module('ErrorInfo', [])
	.directive('errorInfo', component)
	.name;
