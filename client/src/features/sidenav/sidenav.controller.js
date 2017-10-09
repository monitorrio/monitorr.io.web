export default class SideNavController {
	static get $inject() {
		return ['$rootScope', '$state', 'logs'];
	}

	constructor($rootScope, $state, logService) {
		this.$rootScope = $rootScope;
		this.$state = $state;
		this.logService = logService;
	}

	$onInit() {
		this.getLogs();

		this.$rootScope.$on('updateLogs', ()=> {
			this.getLogs();
		});
	}

	getLogs() {
		this.logService.getLogs().then((result) => {
			this.logs = result;
		});
	}
}
