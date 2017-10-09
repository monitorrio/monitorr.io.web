routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
	$stateProvider.state('auth', {
		url: '/',
		abstract: true,
		template: '<auth></auth>'
	});
}
