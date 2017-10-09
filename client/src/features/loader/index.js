import './loader.styl';

import angular from 'angular';

import loader from './loader';
import LoaderService from './loader.service';

export default angular.module('Loader', [])
	.directive('loader', loader)
	.service('loaderService', LoaderService)
	.name;
