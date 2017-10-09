run.$inject = ['$rootScope', '$state', 'jwtHelper', 'localStorageService', 'auth', 'principal'];

export default function run($rootScope, $stateProvider, jwtHelper, store, auth, principal) {

	$rootScope.$on('$stateChangeStart', function (event, toParams) {
		let token = store.get('token');

		if (!token && !toParams.allowAnonymous) {
			event.preventDefault();
			$stateProvider.go('auth.login');
		}

		if (token && jwtHelper.isTokenExpired(token)) {
			if (toParams.name === 'auth.login' || toParams.name === 'auth.signup') {
				return;
			}
			event.preventDefault();
			$stateProvider.go('auth.login');
		}

		if (token && !principal.isAuthenticated()) {
			let profile = store.get('profile');
			auth.authenticate(profile, token);

			principal.updateCurrent(profile, token);
		}
	});

	auth.hookEvents();
}
