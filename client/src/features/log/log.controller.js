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
		this.errorId = $stateParams.errorId;
		this.tableOptions = {
			LogId: $stateParams.id
		};
		this.logName = '';
		this.showErrorTab = this.errorId !== undefined && this.errorId !== '' && this.errorId !== 'settings';
		this.errorInfo = {};
	}

	$onInit() {
		this.$rootScope.$on('openErrorDetails', () => {
			this.switchToErrorTab();
		});

		this.$rootScope.$on('openErrorInfo', () => {
			this.switchToErrorInfoTab();
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

	switchToErrorInfoTab() {
		this.$window.$('.nav a[data-target="#errorInfo"]').tab('show');
	}
}
