import treeLogHtml from './treeLog.html';
import treeLogController from './treeLog.controller';
export default TreeLog;

TreeLog.$inject = [];

function TreeLog() {
	return {
		restrict: 'E',
		scope: {},
		replace: true,
		template: treeLogHtml,
		controller: treeLogController,
		controllerAs: 'ctrl',
		bindToController: {
			log: '='
		},
		link: function () {

		}
	};
}
