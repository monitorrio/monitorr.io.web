import './settings.styl';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import settings from './settings';

export default angular.module('Settings', [uirouter])
	.directive('settings', settings)
	.name;
