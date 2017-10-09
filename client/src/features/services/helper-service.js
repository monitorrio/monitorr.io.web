export default HelpersService;

HelpersService.$inject = [];

function HelpersService() {

	function toDateFromDays(n) {
		var newDate = new Date();
		newDate.setHours(0, 0, 0, 0);
		newDate.setDate(newDate.getDate() - n);

		return newDate;
	}

	function toDateFrom(count, param) {
		var newDate = new Date();
		if (param === 'm') {
			newDate.setMinutes(newDate.getMinutes() - count);
		}

		if (param === 'h') {
			newDate.setHours(newDate.getHours() - count);
		}

		if (param === 'd') {
			newDate.setDate(newDate.getDate() - count);
		}

		return newDate;
	}

	function getBrowserIconClass(name) {
		if (!name) {
			return null;
		}
		switch (name.toLowerCase()) {
			case 'chrome':
				return 'fa-chrome';
			case 'ie':
				return 'fa-internet-explorer';
			case 'edge':
			case 'microsoft edge':
				return 'fa-edge';
			case 'opera':
				return 'fa-opera';
			case 'firefox':
				return 'fa-firefox';
			case 'safari':
				return 'fa-safari';
		}
		return null;
	}

	return {
		toDateFromDays,
		toDateFrom,
		getBrowserIconClass
	};
}

