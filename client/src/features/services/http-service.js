export default class HttpService {
	static get $inject() {
		return ['$http', 'ENV'];
	}

	constructor($http, ENV) {
		this.$http = $http;
		this.ENV = ENV;
		this.baseApi = this.ENV.BASE_API;
	}


	putJson(ngRequest) {
		let url = this.baseApi + ngRequest.url;
		return this.$http.put(url, ngRequest.data);
	}

	postJson(ngRequest) {
		let url;
		if (ngRequest.isFullUrl) {
			url = ngRequest.url;
		} else {
			url = this.baseApi + ngRequest.url;
		}

		return this.$http.post(url, ngRequest.data);
	}

	getJson(ngRequest) {
		let url = this.baseApi + ngRequest.url;
		return this.$http.get(url);
	}

	deleteJson(ngRequest) {
		let url = this.baseApi + ngRequest.url;
		return this.$http.delete(url, ngRequest.data);
	}

}
