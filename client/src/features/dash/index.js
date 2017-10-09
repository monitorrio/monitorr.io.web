import './dash.styl';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './dash.routes';
import dash from './dash';

export default angular.module('Dash', [uirouter])
	.config(routing)
	.directive('dash', dash)
	.name;
