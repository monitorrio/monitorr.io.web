import widgetLogHtml from './widgetLog.html';
import widgetLogController from './widgetLog.controller';
export default WidgetLog;

WidgetLog.$inject = [];

function WidgetLog() {
	return {
		restrict: 'E',
		scope: {},
		template: widgetLogHtml,
		controller: widgetLogController,
		controllerAs: 'ctrl',
		bindToController: {
			log: '='
		},
		link: function ($scope, elem, attrs) {

		}
	};
}
