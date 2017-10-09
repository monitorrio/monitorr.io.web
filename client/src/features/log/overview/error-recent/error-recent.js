import template from './error-recent.html';
import controller from './error-recent.controller';

export default ErrorRecent;

ErrorRecent.$inject = [];

function ErrorRecent() {
	return {
		restrict: 'E',
		scope: {},
		template: template,
		controller: controller,
		controllerAs: 'ctrl',
		bindToController: {
			rows: '<'
		},
		link: function () {

		}
	};
}
