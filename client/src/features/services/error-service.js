export default class Errors {
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

	getNewErrors(datetime) {
		var request = {
			url: '/errors/new?lastChecked=' + datetime
		};
		return this.httpService.getJson(request)
			.then((response) => {
				return response.data;
			});
	}


}
