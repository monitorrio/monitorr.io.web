import addLogModalController from './../quickAddLog/addLogModal.controller';
import addLogModalHtml from './../quickAddLog/addLogModal.html';

export default class WidgetLogController {
	static get $inject() {
		return ['$uibModal'];
	}

	constructor($uibModal) {
		this.$uibModal = $uibModal;
	}

	$onInit() {
		this.css = {'background-color': this.log.WidgetColor};
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
				logModel: () => {
					return this.log;
				}
			}
		});
	}
}
