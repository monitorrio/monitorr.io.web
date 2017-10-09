import template from './error-details.html';
import controller from './error-details.controller';
export default ErrorDetails;

ErrorDetails.$inject = [];

function ErrorDetails() {
	return {
		restrict: 'E',
		scope: {},
		template: template,
		controller: controller,
		controllerAs: 'ctrl',
		bindToController: {
			error: '<'
		},
		link: function () {
		}
	};
}
