export default {
	severity: {
		fatal: 0,
		critical: 1,
		warning: 2,
		info: 3
	},

	getByValue(enumName, value) {
		if (!this[enumName]) {
			throw new Error('Wrong enum name');
		}
		return Object.keys(this[enumName])
			.filter(key => {
				return this[enumName][key] === value;
			})[0];
	},

	getSeverityBgColor(severity) {
		let colorMap = {
			[this.severity.fatal]: 'bg-red',
			[this.severity.critical]: 'bg-red',
			[this.severity.warning]: 'bg-yellow',
			[this.severity.info]: 'bg-yellow'
		};

		return colorMap[severity];
	},

	getSeverityColor(severity) {
		let colorMap = {
			[this.severity.fatal]: 'text-red',
			[this.severity.critical]: 'text-red',
			[this.severity.warning]: 'text-yellow',
			[this.severity.info]: 'text-yellow'
		};

		return colorMap[severity];
	}
};


