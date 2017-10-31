import $ from 'jquery';
import angular from 'angular';
import errorInfoHtml from './error-info.html';
import controller from './error-info.controller';
export default ErrorInfo;

ErrorInfo.$inject = ['$compile', '$rootScope'];

function ErrorInfo($compile, $rootScope) {
	return {
		restrict: 'E',
		scope: {},
		template: errorInfoHtml,
		controller: controller,
		controllerAs: 'ctrl',
		bindToController: {
		},
		link: function (scope, elem, attrs) {

			if (scope.haveToRequestErrorInfo) {
				scope.getErrorInfoPromise.then((result) => {
					let mainDiv = $('#errorInfoContainer');
					let errorDetailsComp = angular.element('<error-details error="error"></error-details>');
					let newScope = scope.$new(true);
					newScope.error = result.data;
					let html = $compile(errorDetailsComp)(newScope);
					mainDiv.append(html);

					$rootScope.$emit('openErrorInfo');
				});
			}
		}
	};
}
