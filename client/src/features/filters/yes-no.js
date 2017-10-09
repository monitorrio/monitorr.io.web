export default YesNo;

function YesNo() {
	return function (input) {
		return input ? 'Yes' : 'No';
	};
}
