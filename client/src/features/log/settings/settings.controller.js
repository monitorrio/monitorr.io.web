export default class SettingsController {
	static get $inject() {
		return ['$state', '$rootScope', '$stateParams', 'loaderService', 'logs', 'sweet'];
	}

	constructor($state, $rootScope, $stateParams, loaderService, logService, sweetAlert) {
		this.$state = $state;
		this.loaderService = loaderService;
		this.$rootScope = $rootScope;
		this.logService = logService;
		this.sweetAlert = sweetAlert;
		this.logId = $stateParams.id;
		this.isOwner = false;
		this.logName = '';
	}

	$onInit() {
		this.logService.isOwner(this.logId)
			.then(r => {
				this.isOwner = r.data;
			});

		this.logService.getName(this.logId).then((result) => {
			this.logName = result.data;
		});
	}


	clearLog() {
		this.sweetAlert.show({
			title: 'Clear log',
			text: 'Are you sure you want to clear this log, once cleared it cannot be restored?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#e2231e',
			confirmButtonText: 'Yes, clear it!',
			closeOnConfirm: true
		}, () => {
			this.loaderService.show();
			this.logService.clear(this.logId)
				.then((result) => {
					this.loaderService.hide();
					this.$rootScope.$emit('updateLogs');
					this.sweetAlert.show('Cleared!', 'The log has been cleared.', 'success');
				})
				.catch((e) => {
					this.loaderService.hide();
					this.sweetAlert.show('Oops...!', e.data.Message, 'error');
				});
		});
	}

	deleteLog() {
		this.sweetAlert.show({
			title: 'Delete log',
			text: 'Are you sure you want to delete this log, once deleted it cannot be restored?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#e2231e',
			confirmButtonText: 'Yes, delete it!',
			closeOnConfirm: true
		}, () => {
			this.loaderService.show();
			this.logService.delete(this.logId)
				.then((result) => {
					this.loaderService.hide();
					this.$rootScope.$emit('updateLogs');
					this.$state.go('main.dash');
				})
				.catch((e) => {
					this.loaderService.hide();
					this.sweetAlert.show('Oops...!', e.data.Message, 'error');
				});
		});
	}
}
