import template from './overview.html';
import controller from './overview.controller';
export default Overview;

Overview.$inject = [];

function Overview() {
	return {
		restrict: 'E',
		scope: {},
		replace: true,
		template: template,
		controller: controller,
		controllerAs: 'ctrl',
		bindToController: {
		},
		link: function () {

		}
	};
}
