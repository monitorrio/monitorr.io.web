import mainHtml from './main.html';

export default Main;

Main.$inject = [
	'$rootScope',
	'$timeout',
	'EVENTS',
	'$state',
	'localStorageService',
	'$window'
];

function Main($rootScope, $timeout, EVENTS, $state, localStorageService, $window) {
	return {
		restrict: 'E',
		scope: {},
		template: mainHtml,
		link: function ($scope, elem, attrs) {
		}
	};
}
