import navbarHtml from './navbar.html';
import navBarController from './navbar.controller';

export default Navbar;

Navbar.$inject = [
];

function Navbar() {
	return {
		restrict: 'E',
		scope: {},
		replace: true,
		controller: navBarController,
		controllerAs: 'ctrl',
		template: navbarHtml,
		link: function ($scope, elem, attrs) {
		}
	};
}
