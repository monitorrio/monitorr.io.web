export default class AddLogModalController {
	static get $inject() {
		return ['$rootScope', '$uibModalInstance', 'logs', 'logModel'];
	}

	constructor($rootScope, $uibModalInstance, logService, logModel) {
		this.$rootScope = $rootScope;
		this.$uibModalInstance = $uibModalInstance;
		this.logService = logService;
		this.logModel = logModel;
	}

	save() {
		this.summaryError = '';
		if (!this.logModel.Name) {
			this.logNameHasError = true;
			return;
		}

		let newLog = {
			logId: this.logModel.LogId,
			widgetColor: this.logModel.WidgetColor,
			name: this.logModel.Name,
			isDailyDigestEmail: this.logModel.IsDailyDigestEmail,
			isNewErrorEmail: this.logModel.IsNewErrorEmail
		};

		this.logService.saveOrUpdate(newLog)
			.then(() => {
				this.$rootScope.$emit('updateLogs');
				this.$uibModalInstance.close();
			})
			.catch((resp) => {
				if (resp.data.Message) {
					this.summaryError = resp.data.Message;
				} else {
					this.summaryError = 'Something went wrong';
				}
			});

	}

	close() {
		this.$uibModalInstance.dismiss();
	}
}
