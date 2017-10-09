import dashHtml from './dash.html';
import dashController from './dash.controller';
export default Dash;

Dash.$inject = [];

function Dash() {
	return {
		restrict: 'E',
		scope: {},
		template: dashHtml,
		controller: dashController,
		controllerAs: 'ctrl',
		link: function () {
		}
	};
}
