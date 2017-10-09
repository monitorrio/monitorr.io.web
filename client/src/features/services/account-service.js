export default class AccountService {
	static get $inject() {
		return ['$http', '$q', '$rootScope', 'httpService', 'localStorageService'];
	}

	constructor($http, $q, $rootScope, httpService, localStorageService) {
		this.$http = $http;
		this.$q = $q;
		this.$rootScope = $rootScope;
		this.httpService = httpService;
		this.localStorageService = localStorageService;
	}


	inviteUser(data) {
		let request = {
			url: '/accounts/invite',
			data: data
		};

		return this.httpService.postJson(request);
	}

	inviteUserAgain(data) {
		let request = {
			url: '/accounts/reinvite',
			data: data
		};

		return this.httpService.postJson(request);
	}
}
