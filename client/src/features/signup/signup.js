import signupHtml from './signup.html';
import signupController from './signup.controller';
export default Signup;

Signup.$inject = [];

function Signup() {
	return {
		restrict: 'E',
		scope: {
		},
		bindToController: true,
		controller: signupController,
		controllerAs: 'signupController',
		template: signupHtml,
		link: function (scope, elem, attrs) {
		}
	};
}
