import resetPasswordHtml from './reset-password.html';
import resetPasswordController from './reset-password.controller.js';
export default ResetPassword;

ResetPassword.$inject = [
	'$rootScope',
	'$window',
	'localStorageService',
	'EVENTS'
];

function ResetPassword() {
	return {
		restrict: 'E',
		scope: {
		},
		bindToController: true,
		controller: resetPasswordController,
		controllerAs: 'resetPasswordController',
		template: resetPasswordHtml,
		link: function (scope, elem, attrs) {
		}
	};
}
