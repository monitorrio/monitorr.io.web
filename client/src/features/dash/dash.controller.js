export default class DashController {
	static get $inject() {
		return ['$rootScope', 'logs', 'loaderService', 'localStorageService'];
	}

	constructor($rootScope, logService, loaderService, localStorageService) {
		this.$rootScope = $rootScope;
		this.logService = logService;
		this.loaderService = loaderService;
		this.localStorageService = localStorageService;
		this.logs = [];
		this.reorderDisabled = true;
		this.dragControlListeners = {
			//optional param
			containment: '#sortable-widget',
			containerPositioning: 'relative',
			orderChanged: (event) => {
				let sortedLogs = this.logs.map((item, index) => {
					return {name: item.Name, index: index};
				});
				this.localStorageService.set('logsOrder', sortedLogs);
			}
		};
	}

	$onInit() {
		this.getLogs();

		this.$rootScope.$on('updateLogs', () => {
			this.getLogs();
		});
	}

	getLogs() {
		this.loaderService.show();
		this.logService.getLogs().then((result) => {
			this.logs = result;

			this.loaderService.hide();
		});
	}

	toggleReorder() {
		this.reorderDisabled = !this.reorderDisabled;
	}
}
