import inviteUserHtml from './invite-user.html';
import inviteUserController from './invite-user.controller';
export default InviteUser;

InviteUser.$inject = ['$state', 'notifications', 'logs'];

function InviteUser($state, notifications, logs) {
	return {
		restrict: 'E',
		scope: {},
		template: inviteUserHtml,
		controller: inviteUserController,
		controllerAs: 'ctrl',
		link: function ($scope, elem, attrs) {

		}
	};
}
