export default class ErrorRecentController {
	static get $inject() {
		return ['$rootScope', 'enumService'];
	}

	constructor($rootScope, enumService) {
		this.$rootScope = $rootScope;
		this.enumService = enumService;
	}

	getColor(severity) {
		return this.enumService.getSeverityBgColor(severity);
	}

	errorClick(errorGuid) {
		this.$rootScope.$emit('openErrorDetails', errorGuid);
	}

	$onInit() {
	}
}
