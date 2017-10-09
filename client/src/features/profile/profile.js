import template from './profile.html';
import controller from './profile.controller';
export default Profile;

Profile.$inject = [];

function Profile() {
	return {
		restrict: 'E',
		scope: {},
		template: template,
		controller: controller,
		controllerAs: 'ctrl',
		link: function () {
		}
	};
}
