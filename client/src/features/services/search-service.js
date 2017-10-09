import angular from 'angular';

export default searchService;

searchService.$inject = ['$http', 'ENV'];

function searchService($http, ENV) {
	function responseMessage(message) {}
	function onSuccess(response) {
		if (angular.isObject(response.data) && angular.isObject(response.data.Message)) {
			responseMessage(response.data.Message);
		}
	}
	function onError(response) {
		if (angular.isObject(response.data) && angular.isObject(response.data.Message)) {
			responseMessage(response.data.Message);
		}
	}
	function request(ngRequest) {}
	function postJson(ngRequest) {
		var url = ENV.BASE_API + ngRequest.Url;

		return $http.post(url, ngRequest.Data, {
		}).then(function (response) {
			if (angular.isFunction(ngRequest.onSuccess)) {
				ngRequest.onSuccess(response);
			} onSuccess(response);
		}, function (response) {
			if (angular.isFunction(ngRequest.onError)) {
				ngRequest.onError(response);
			}
			onError(response);
		});
	}
	function getJson(ngRequest) {
		var url = ENV.BASE_API + ngRequest.url;

		var configuration = {
		};
		if (ngRequest.fileDownload) {
			configuration.responseType = 'arraybuffer';
		}
		if (ngRequest.params) {
			configuration.params = {
				userId: ngRequest.params.userId
			};
		}

		return $http.get(url, configuration).then(ngRequest.onSuccess
			? ngRequest.onSuccess
			: onSuccess, ngRequest.onError
			? ngRequest.onError
			: onError);
	}

	return {request, postJson, getJson};
}
