routing.$inject = ['$urlRouterProvider', '$locationProvider', 'localStorageServiceProvider'];

export default function routing($urlRouterProvider, $locationProvider, localStorageServiceProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/dash');
	localStorageServiceProvider.setPrefix('monitorr');
}
