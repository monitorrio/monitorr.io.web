export default class Principal {
	static get $inject() {
		return ['$state', '$http', '$q', '$rootScope', 'auth', 'httpService', 'localStorageService', 'ENV', 'loaderService'];
	}

	constructor($state, $http, $q, $rootScope, auth, httpService, store, ENV, loaderService) {
		this.$state = $state;
		this.$http = $http;
		this.$q = $q;
		this.$rootScope = $rootScope;
		this.httpService = httpService;
		this.auth = auth;
		this.store = store;
		this.ENV = ENV;
		this.loaderService = loaderService;
	}


	updateCurrent(profile, token) {
		this.currentPrincipal = {};
		this.currentPrincipal.profile = profile;
		this.currentPrincipal.token = token;
	}

	setUserId(userId) {
		this.currentPrincipal.profile.id = userId;
	}

	syncCurrent(profile) {
		let request = {
			url: '/accounts',
			data: profile
		};

		return this.httpService.postJson(request);
	}

	signOut() {
		this.auth.signout();
		this.store.remove('profile');
		this.store.remove('token');
		this.store.remove('refreshToken');
	}

	onLoginSuccess(resolve, reject, profile, token) {
		let userData = this.collectData(profile);
		this.store.set('profile', profile);
		this.store.set('token', token);
		this.updateCurrent(profile, token);
		return this.syncCurrent(userData)
			.then((r) => {
				this.setUserId(r.data);
				return resolve();
			})
			.catch((e) => {
				this.signOut();
				return reject(e);
			});
	}

	onLoginFailed(reject, error) {
		return reject(error.details);
	}

	collectData(profile) {
		let data = {
			firstName: profile.given_name,
			lastName: profile.family_name,
			name: profile.name,
			userId: profile.user_id,
			email: profile.email,
			pictureUrl: profile.picture
		};

		angular.extend(data, profile.user_metadata);
		return data;
	}

	signOAuth(connection) {
		return this.$q((resolve, reject) => {
			this.auth.signin({
				popup: true,
				connection: connection,
				scope: 'openid name email'
			}, this.onLoginSuccess.bind(this, resolve, reject), this.onLoginFailed.bind(this, resolve));
		});
	}

	signin(credentials) {
		return this.$q((resolve, reject) => {
			this.auth.signin({
				connection: this.ENV.AUTH0_DB_CONNECTION,
				email: credentials.email,
				sso: false,
				password: credentials.password,
				authParams: {
					scope: 'openid name email'
				}
			}, this.onLoginSuccess.bind(this, resolve, reject), this.onLoginFailed.bind(this, reject));
		});
	}

	signup(data) {
		data.clientId = this.ENV.AUTH0_CLIENT_ID;
		data.connection = this.ENV.AUTH0_DB_CONNECTION;
		let request = {
			url: this.ENV.AUTH0_SIGNUP_URL,
			data: data,
			isFullUrl: true
		};

		return this.httpService.postJson(request)
			.then(() => {
				let credentials = {
					email: data.email,
					password: data.password
				};
				return this.signin(credentials);
			})
			.catch(e => {
				return Promise.reject(e.data);
			});
	}

	resetPassword(email) {
		let data = {
			email: email,
			connection: this.ENV.AUTH0_DB_CONNECTION
		};
		return this.$q((resolve, reject) => {
			this.auth.reset(data, r => {
				return resolve(r);
			}, e => {
				return reject(e);
			});
		});

	}

	getCurrent() {
		return this.currentPrincipal.profile;
	}

	isAuthenticated() {
		return !!this.currentPrincipal;
	}
}
