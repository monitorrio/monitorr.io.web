import './double-bar.styl';

import angular from 'angular';

import component from './double-bar';

export default angular.module('DoubleBar', [])
	.directive('doubleBar', component)
	.name;
