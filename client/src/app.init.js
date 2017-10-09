init.$inject = ['$httpProvider', 'jwtInterceptorProvider', 'jwtOptionsProvider', 'authProvider'];

export default function init($httpProvider, jwtInterceptorProvider, jwtOptionsProvider, auth) {
	auth.init({
		domain: AUTH0_DOMAIN,
		clientID: AUTH0_CLIENT_ID,
		loginUrl: AUTH_REDIRECTURL
	});

	function tokenGetter(store) {
		return store.get('token');
	}

	tokenGetter.$inject = ['localStorageService'];

	jwtOptionsProvider.config({

		tokenGetter: tokenGetter,
		whiteListedDomains: ['localhost', '201apps.com', 'api.monitorr.io', 'staging-api.monitorr.io', 'admin.monitorr.io', 'staging-admin.monitorr.io', 'monitorr.io']
	});

	$httpProvider.interceptors.push('jwtInterceptor');
}
