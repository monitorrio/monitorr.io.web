routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
	$stateProvider.state('auth.reset', {
		url: 'reset',
		parent: 'auth',
		template: '<reset-password></reset-password>',
		allowAnonymous: true
	});
}
