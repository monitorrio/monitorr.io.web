export default Notifications;

import notificationsMock from './notifications-mock.json';

Notifications.$inject = [
	'$http',
	'$q'
];

function Notifications($http, $q) {

	function getNotifications() {
		// return $http.get(...);
		return $q.resolve(notificationsMock.mock);
	}

	return {
		getNotifications
	};

}
