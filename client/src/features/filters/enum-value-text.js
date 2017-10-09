export default EnumValueText;

EnumValueText.$inject = ['enumService'];

function EnumValueText(enumService) {
	return function (value, enumName) {
		if (!Number.isInteger(value)) {
			return 'N/A';
		}
		return enumService.getByValue(enumName, value);
	};
}
