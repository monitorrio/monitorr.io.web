import './appfooter.styl';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import appfooter from './appfooter';

export default angular.module('Appfooter', [uirouter])
	.directive('appfooter', appfooter)
	.name;
