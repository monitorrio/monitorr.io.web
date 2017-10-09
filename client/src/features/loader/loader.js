import loaderHtml from './loader.html';
export default Loader;

Loader.$inject = ['$http', 'loaderService'];

function Loader($http, loaderService) {
	return {
		restrict: 'E',
		scope: {},
		replace: true,
		template: loaderHtml,
		controllerAs: 'ctrl',
		link: function ($scope, elem, attrs) {
			$scope.$watch(() => {
				return loaderService.isShowing;
			}, toggleElement);

			function toggleElement(loading) {
				if (loading) {
					elem.show();
				} else {
					elem.hide();
				}
			}
		}
	};
}
