import sidenavHtml from './sidenav.html';
import sideNavController from './sidenav.controller';

export default Sidenav;

Sidenav.$inject = [
];

function Sidenav() {
	return {
		restrict: 'E',
		scope: {},
		template: sidenavHtml,
		controller: sideNavController,
		controllerAs: 'ctrl',
		link: function ($scope, elem, attrs) {

		}
	};
}
