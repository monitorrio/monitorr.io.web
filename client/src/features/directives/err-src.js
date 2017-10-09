export default ErrSrc;

function ErrSrc() {
	return {
		restrict: 'A', // only activate on element attribute
		link: function ($scope, elem, attrs) {
			elem.bind('error', function () {
				if (attrs.src !== attrs.errSrc) {
					attrs.$set('src', attrs.errSrc);
				}
			});
		}
	};
}

