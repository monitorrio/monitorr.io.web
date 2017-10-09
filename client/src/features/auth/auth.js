import authHtml from './auth.html';

export default Auth;

Auth.$inject = [
	'$rootScope',
	'$timeout',
	'EVENTS',
	'$state',
	'localStorageService',
	'$window'
];

function Auth($rootScope, $timeout, EVENTS, $state, localStorageService, $window) {
	return {
		restrict: 'E',
		scope: {},
		template: authHtml,
		link: function ($scope, elem, attrs) {
		}
	};
}
