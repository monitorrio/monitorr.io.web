export default class Logs {
	static get $inject() {
		return ['$http', '$q', '$rootScope', 'httpService', 'localStorageService'];
	}

	constructor($http, $q, $rootScope, httpService, localStorageService) {
		this.$http = $http;
		this.$q = $q;
		this.$rootScope = $rootScope;
		this.httpService = httpService;
		this.localStorageService = localStorageService;
		this.logs = null;
	}

	loadData() {
		let request = {url: '/logs'};
		return this.httpService.getJson(request)
			.then((response) => {
				this.logs = response.data;
				return response.data;
			});
	}

	getLogs() {
		if (this.getDefer) {
			return this.getDefer.promise;
		}

		this.getDefer = this.$q.defer();
		this.loadData().then((data) => {
			let sortable = this.localStorageService.get('logsOrder');
			if (sortable) {
				this.sortLogs(data, sortable);
			}
			this.getDefer.resolve(data);
			delete this.getDefer;
		});

		return this.getDefer.promise;
	}

	sortLogs(data, sortable) {
		data.sort((first, second) => {
			let secondSortable = sortable.find((item => {
				return second.Name === item.name;
			}));

			if (!secondSortable) {
				return -1;
			}

			let firstSortable = sortable.find((item => {
				return first.Name === item.name;
			}));

			if (!firstSortable) {
				return 1;
			}

			if (firstSortable.index < secondSortable.index) {
				return -1;
			} else {
				return 1;
			}

		});
	}

	saveOrUpdate(log) {
		let req = {
			url: '/logs',
			data: log
		};
		if (log.logId) {
			return this.httpService.putJson(req);

		} else {
			return this.httpService.postJson(req);
		}
	}

	getName(logId) {
		let request = {
			url: '/logs/' + logId + '/name'
		};

		return this.httpService.getJson(request);
	}

	getError(errorId) {
		let request = {
			url: '/errors/' + errorId + '/info'
		};
		return this.httpService.getJson(request);
	}

	getLog(logId) {
		let request = {
			url: '/logs/' + logId
		};
		return this.httpService.getJson(request);
	}

	delete(logId) {
		let request = {
			url: '/logs?logId=' + logId,
			data: logId
		};

		return this.httpService.deleteJson(request);
	}

	clear(logId) {
		let request = {
			url: '/logs/clear',
			data: {logId: logId}
		};

		return this.httpService.postJson(request);
	}

	getAggregatedErrorsCount(logId, timeZoneOffset, from, to) {
		let request = {
			url: `/logs/${logId}/overview/aggregate?from=${from}&to=${to}&timeZoneOffset=${timeZoneOffset}`
		};
		return this.httpService.getJson(request);
	}

	getLogOverview(logId, from, to) {
		let request = {
			url: `/logs/${logId}/overview?from=${from}&to=${to}`
		};
		return this.httpService.getJson(request);
	}

	addUserAccess(data) {
		let request = {
			url: '/logs/addUserAccess',
			data: data
		};

		return this.httpService.postJson(request);
	}

	isOwner(logId) {
		let request = {
			url: '/logs/isOwner/' + logId
		};
		return this.httpService.getJson(request);
	}
}
