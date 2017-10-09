import template from './error-aggregate.html';
import controller from './error-aggregate.controller';

export default ErrorAggregate;

ErrorAggregate.$inject = [];

function ErrorAggregate() {
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
