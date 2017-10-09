import loginHtml from './login.html';
import loginController from './login.controller';
export default Login;

Login.$inject = [
	'$rootScope',
	'$window',
	'localStorageService',
	'EVENTS'
];

function Login($rootScope, $window, localStorageService, EVENTS) {
	return {
		restrict: 'E',
		scope: {
		},
		bindToController: true,
		controller: loginController,
		controllerAs: 'loginController',
		template: loginHtml,
		link: function (scope, elem, attrs) {
		}
	};
}
