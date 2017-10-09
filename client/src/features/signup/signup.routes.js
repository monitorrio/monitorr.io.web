routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
	$stateProvider.state('auth.signup', {
		url: 'signup',
		parent: 'auth',
		template: '<signup></signup>',
		allowAnonymous: true
	});
}
