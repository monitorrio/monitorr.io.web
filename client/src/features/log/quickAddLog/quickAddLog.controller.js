import addLogModalController from './addLogModal.controller';
import addLogModalHtml from './addLogModal.html';

export default class QuickAddLogController {
	static get $inject() {
		return ['$uibModal', 'logs'];
	}

	constructor($uibModal, logService) {
		this.logService = logService;
		this.$uibModal = $uibModal;
	}

	showModal() {
		let modalInstance = this.$uibModal.open({
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			template: addLogModalHtml,
			controller: addLogModalController,
			controllerAs: 'ctrl',
			resolve: {
				logModel: {}
			}
		});
	}
}
