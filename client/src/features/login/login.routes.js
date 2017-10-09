routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
	$stateProvider.state('auth.login', {
		url: 'login',
		parent: 'auth',
		template: '<login></login>',
		allowAnonymous: true
	});
}
