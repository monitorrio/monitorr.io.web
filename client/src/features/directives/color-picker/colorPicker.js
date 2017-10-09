import colorPickerHtml from './colorPicker.html';
import colorPickerController from './colorPicker.controller';
export default ColorPicker;

ColorPicker.$inject = ['$state', 'notifications', 'logs'];

function ColorPicker() {
	return {
		restrict: 'E',
		scope: {},
		template: colorPickerHtml,
		controller: colorPickerController,
		controllerAs: 'ctrl',
		bindToController: {
			selected: '=',
			customColors: '='
		},
		link: function ($scope, elem, attrs) {

		}
	};
}
