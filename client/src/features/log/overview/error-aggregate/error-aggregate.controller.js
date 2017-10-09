export default class ErrorAggregateController {
	static get $inject() {
		return ['enumService'];
	}

	constructor(enumService) {
		this.enumService = enumService;
	}

	getColor(severity) {
		return this.enumService.getSeverityBgColor(severity);
	}

	$onInit() {
	}
}
