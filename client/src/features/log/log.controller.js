export default class LogController {
	static get $inject() {
		return ['$rootScope', '$scope', '$stateParams', '$window', 'logs'];
	}

	constructor($rootScope, $scope, $stateParams, $window, logService) {
		this.$rootScope = $rootScope;
		this.$scope = $scope;
		this.$window = $window;
		this.logService = logService;
		this.logId = $stateParams.id;
		this.tableOptions = {
			LogId: $stateParams.id
		};
		this.logName = '';
	}

	$onInit() {
		this.$rootScope.$on('openErrorDetails', () => {
			this.switchToErrorTab();
		});

		this.$scope.$on('errorTableFilterUpdate', () => {
			this.switchToErrorTab();
		});

		this.logService.getName(this.logId).then((result) => {
			this.logName = result.data;
		});
	}

	switchToErrorTab() {
		this.$window.$('.nav a[data-target="#errors"]').tab('show');
	}
}
