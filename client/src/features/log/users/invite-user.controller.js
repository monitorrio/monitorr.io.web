export default class InviteUserController {
	static get $inject() {
		return ['$rootScope', '$uibModalInstance', 'sweet', 'accountService', 'logId', 'loaderService'];
	}

	constructor($rootScope, $uibModalInstance, sweetAlert, accountService, logId, loaderService) {
		this.$rootScope = $rootScope;
		this.$uibModalInstance = $uibModalInstance;
		this.accountService = accountService;
		this.sweetAlert = sweetAlert;
		this.logId = logId;
		this.loaderService = loaderService;
	}

	save() {
		this.loaderService.show();
		this.summaryError = '';
		if (!this.email) {
			this.emailHasError = true;
			return;
		}

		let inviteModel = {
			email: this.email,
			logId: this.logId,
			canRead: this.canRead,
			canWrite: this.canWrite
		};

		this.accountService.inviteUser(inviteModel)
			.then(() => {
				this.close();
				this.loaderService.hide();
				this.sweetAlert.show('Invite User', 'The user has been invited.', 'success');

			})
			.catch((e) => {
				this.summaryError = e.data.Message;
				this.loaderService.hide();
			});
	}

	close() {
		this.$uibModalInstance.dismiss();
	}
}
