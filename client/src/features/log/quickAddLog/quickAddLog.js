import quickAddLogHtml from './quickAddLog.html';
import quickAddController from './quickAddLog.controller';
export default QuickAddLog;

QuickAddLog.$inject = ['$state', 'notifications', 'logs'];

function QuickAddLog($state, notifications, logs) {
	return {
		restrict: 'E',
		scope: {},
		template: quickAddLogHtml,
		controller: quickAddController,
		controllerAs: 'ctrl',
		link: function ($scope, elem, attrs) {

		}
	};
}
