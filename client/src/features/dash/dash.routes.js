routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
	$stateProvider.state('main.dash', {
		url: 'dash',
		parent: 'main',
		template: '<dash></dash>'
	});
}
