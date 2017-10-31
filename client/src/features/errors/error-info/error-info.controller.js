
export default class ErrorInfoController {
	static get $inject() {
		return ['$scope', '$stateParams', '$q', 'logs', 'loaderService'];
	}

	constructor($scope, $stateParams, $q, logService, loaderService) {
		this.$q = $q;
		this.$scope = $scope;
		this.logService = logService;
		this.loaderService = loaderService;

		this.logId = $stateParams.id;
		this.errorId = $stateParams.errorId;
		$scope.haveToRequestErrorInfo = $stateParams.errorId !== undefined && $stateParams.errorId !== '' && $stateParams.errorId !== 'settings';
		if ($scope.haveToRequestErrorInfo) {
			$scope.getErrorInfoPromise = this.logService.getError(this.errorId);
		}
	}

	$onInit() {

	}
}
