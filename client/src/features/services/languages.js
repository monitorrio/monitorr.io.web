export default Languages;

import languagesMock from './languages-mock.json';

Languages.$inject = [
	'$http',
	'$q'
];

function Languages($http, $q) {

	function getLanguages() {
		// return $http.get(...);
		return $q.resolve(languagesMock.mock);
	}

	return {
		getLanguages
	};

}
