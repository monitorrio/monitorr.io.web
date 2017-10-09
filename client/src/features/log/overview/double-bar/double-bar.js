import template from './double-bar.html';
import controller from './double-bar.controller';

export default DoubleBar;

DoubleBar.$inject = [];

function DoubleBar() {
	return {
		restrict: 'E',
		scope: {},
		template: template,
		controller: controller,
		controllerAs: 'ctrl',
		bindToController: {
			error: '<',
			warning: '<'
		},
		link: function () {

		}
	};
}
