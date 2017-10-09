import './sidenav.styl';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import sidenav from './sidenav';

export default angular.module('Sidenav', [uirouter])
	.directive('sidenav', sidenav)
	.name;
