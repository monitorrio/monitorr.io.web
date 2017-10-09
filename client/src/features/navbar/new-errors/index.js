import './new-errors.styl';

import angular from 'angular';
import newErrors from './new-errors';

export default angular.module('NewError', [])
	.directive('newErrors', newErrors)
	.name;
