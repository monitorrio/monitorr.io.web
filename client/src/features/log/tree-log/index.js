import './treeLog.styl';

import angular from 'angular';

import treeLog from './treeLog';

export default angular.module('TreeLog', [])
	.directive('treeLog', treeLog)
	.name;
