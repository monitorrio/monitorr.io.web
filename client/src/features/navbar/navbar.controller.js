export default class NavBarController {
	static get $inject() {
		return ['$state', 'localStorageService', 'principal', 'errorService'];
	}

	constructor($state, store, principal, errorService) {
		this.$state = $state;
		this.store = store;
		this.principal = principal;
		this.errorService = errorService;
		this.lastErrorChecked = this.store.get('lastErrorChecked');
	}

	$onInit() {
		this.profile = this.principal.getCurrent();
		this.getNewErrors();
	}

	signOut() {
		this.principal.signOut();
		this.$state.go('auth.login');
	}

	getNewErrors() {
		let lastErrorChecked = this.store.get('lastErrorChecked');

		this.errorService.getNewErrors(lastErrorChecked)
			.then((data) => {
				this.lastErrorChecked = new Date();
				this.newErrors = data.Model;
				this.store.set('lastErrorChecked', this.lastErrorChecked);
			});
	}
}
