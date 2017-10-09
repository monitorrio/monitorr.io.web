import appFooterHtml from './appfooter.html';

export default Appfooter;

Appfooter.$inject = [
];

function Appfooter() {
	return {
		restrict: 'E',
		scope: {},
		template: appFooterHtml,
		link: function ($scope, elem, attrs) {
		}
	};
}
