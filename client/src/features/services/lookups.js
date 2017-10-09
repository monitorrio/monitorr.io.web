export default Lookups;

Lookups.$inject = ['localStorageService', '$http', '$q', 'httpService', 'searchService'];

function Lookups(localStorageService, $http, $q, httpService, searchService) {

	function searchErrors(endpoint, query, callBack) {
		var request = {
			Url: endpoint,
			Data: query,
			onSuccess: callBack
		};
		return searchService.postJson(request);
	}

	function searchUsers(endpoint, query, callBack) {
		let request = {
			Url: endpoint,
			Data: query,
			onSuccess: callBack
		};
		return searchService.postJson(request);
	}

	return {searchErrors, searchUsers};
}
