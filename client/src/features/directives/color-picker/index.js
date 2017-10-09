import './colorPicker.styl';

import angular from 'angular';

import colorPicker from './colorPicker';

export default angular.module('ColorPicker', [])
	.directive('colorPicker', colorPicker)
	.name;
