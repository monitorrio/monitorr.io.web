import './error-aggregate.styl';

import angular from 'angular';

import component from './error-aggregate';

export default angular.module('ErrorAggregate', [])
	.directive('errorAggregate', component)
	.name;
