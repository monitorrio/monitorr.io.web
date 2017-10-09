import settingsHtml from './settings.html';
import settingsController from './settings.controller';
export default Settings;

Settings.$inject = [];

function Settings() {
	return {
		restrict: 'E',
		scope: {},
		template: settingsHtml,
		controller: settingsController,
		controllerAs: 'ctrl',
		link: function () {
		}
	};
}
