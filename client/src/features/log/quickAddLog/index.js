import './quickAddLog.styl';
import './addLogModal.styl';

import angular from 'angular';

import quickAddLog from './quickAddLog';

export default angular.module('QuickAddLog', [])
	.directive('quickAddLog', quickAddLog)
	.name;
