import './widgetLog.styl';

import angular from 'angular';

import widgetLog from './widgetLog';

export default angular.module('WidgetLog', [])
	.directive('widgetLog', widgetLog)
	.name;
