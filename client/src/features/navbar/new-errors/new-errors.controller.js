export default class NewErrorsController {
	static get $inject() {
		return ['enumService'];
	}

	constructor(enumService) {
		this.enumService = enumService;
	}

	getColor(severity) {
		return this.enumService.getSeverityColor(severity);
	}
}
