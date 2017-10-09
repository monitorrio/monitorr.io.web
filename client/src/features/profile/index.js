import './profile.styl';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './profile.routes';
import profile from './profile';

export default angular.module('Profile', [uirouter])
	.config(routing)
	.directive('profile', profile)
	.name;
