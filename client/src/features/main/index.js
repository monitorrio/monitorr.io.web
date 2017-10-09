import './main.styl';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './main.routes';
import main from './main';

export default angular.module('Main', [uirouter])
	.config(routing)
	.directive('main', main)
	.name;
