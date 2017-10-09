import './navbar.styl';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import navbar from './navbar';

export default angular.module('Navbar', [uirouter])
	.directive('navbar', navbar)
	.name;
