import './activity.styl';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import errors from './activity';

export default angular.module('Activity', [uirouter])
	.directive('activity', errors)
	.name;
