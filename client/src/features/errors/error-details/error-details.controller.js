export default class ErrorDetailsController {
	static get $inject() {
		return ['helpersService'];
	}

	constructor(helpersService) {
		this.helpersService = helpersService;
	}

	$onInit() {

		this.initIcon();
		this.tabDataCalculate();
	}

	tabDataCalculate() {
		this.serverVariablesCount = Object.keys(this.error.serverVariables).length;
		this.queryStringCount = Object.keys(this.error.queryString).length;
		this.formCount = Object.keys(this.error.form).length;
		this.cookiesCount = Object.keys(this.error.cookies).length;
		this.customDataCount = Object.keys(this.error.customData).length;
	}

	initIcon() {
		this.browserIcon = this.helpersService.getBrowserIconClass(this.error.browser);
		this.osIcon = this.getOsIcon();
	}

	getOsIcon() {
		if (!this.error.browser) {
			return null;
		}
		switch (this.error.browser.toLowerCase()) {
			case 'windows':
				return 'fa-windows';
			case 'linux':
				return 'fa-linux';
			case 'mac':
				return 'fa-apple';
		}
		return null;
	}
}
