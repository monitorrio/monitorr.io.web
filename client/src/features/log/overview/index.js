import './overview.styl';

import angular from 'angular';

import overview from './overview';

export default angular.module('Overview', [])
	.directive('overview', overview)
	.name;
