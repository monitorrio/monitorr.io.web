routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
	$stateProvider.state('main.log', {
		url: 'log/:id/:errorId',
		parent: 'main',
		template: '<log></log>'
	}).state('main.log.settings', {
		url: 'log/:id/settings',
		parent: 'main',
		template: '<settings></settings>'
	});
}
