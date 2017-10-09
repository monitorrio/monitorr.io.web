export default NgPrism;

function NgPrism() {
	return {
		restrict: 'A',
		link: function ($scope, element, attrs) {
			element.ready(function () {
				// eslint-disable-next-line no-undef
				Prism.highlightElement(element[0]);
			});
		}
	};
}

