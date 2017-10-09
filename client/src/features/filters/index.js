import angular from 'angular';

import yesNo from './yes-no';
import visibleColumns from './visible-columns';
import enumValueText from './enum-value-text';

export default angular.module('Filters', [])
	.filter('yesNo', yesNo)
	.filter('visibleColumns', visibleColumns)
	.filter('enumValueText', enumValueText)
	.name;
