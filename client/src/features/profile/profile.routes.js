routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
	$stateProvider.state('main.profile', {
		url: 'profile/:id',
		parent: 'main',
		template: '<profile></profile>'
	});
}
