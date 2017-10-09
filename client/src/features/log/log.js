import logHtml from './log.html';
import logController from './log.controller';
export default Log;

Log.$inject = [];

function Log() {
	return {
		restrict: 'E',
		scope: {},
		template: logHtml,
		controller: logController,
		controllerAs: 'ctrl',
		link: function () {
		}
	};
}
