import angular from 'angular';

import errSrc from './err-src';
import ngPrism from './ngPrism';

export default angular.module('Directives', [])
	.directive('errSrc', errSrc)
	.directive('ngPrism', ngPrism)
	.name;
