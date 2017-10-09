export default class ProfileController {
	static get $inject() {
		return ['$rootScope', '$stateParams', 'loaderService', 'principal'];
	}

	constructor($rootScope, $stateParams, loaderService, principal) {
		this.$rootScope = $rootScope;
		this.loaderService = loaderService;
		this.principal = principal;
		this.userId = $stateParams.id;
	}
	$onInit() {
		this.profile = this.principal.getCurrent();
	}


}
