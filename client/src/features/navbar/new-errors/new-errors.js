import template from './new-errors.html';
import controller from './new-errors.controller';

export default NewErrors;

NewErrors.$inject = [
];

function NewErrors() {
	return {
		restrict: 'E',
		scope: {},
		replace: true,
		controller: controller,
		controllerAs: 'ctrl',
		bindToController: {
			newErrors: '<'
		},
		template: template,
		link: function ($scope, elem, attrs) {
		}
	};
}
