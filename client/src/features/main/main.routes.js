routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
	$stateProvider.state('main', {
		url: '/',
		abstract: true,
		template: '<main></main>'
	});
}
