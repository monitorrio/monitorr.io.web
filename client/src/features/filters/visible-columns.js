export default VisibleColumns;

VisibleColumns.$inject = [
	'$rootScope'
];

function VisibleColumns($rootScope) {
	return function (data, grid, query) {
		let matches = [];

		//no filter defined so bail
		if (query === undefined || query === '') {
			return data;
		}

		let lquery = query.toLowerCase();

		//loop through data items and visible fields searching for match
		let scope = $rootScope.$new(true);
		for (var i = 0; i < data.length; i++) {
			for (var j = 0; j < grid.columnDefs.length; j++) {

				let dataItem = data[i];
				let fieldName = grid.columnDefs[j].field;
				let renderedData = dataItem[fieldName];

				// apply cell filter
				if (grid.columnDefs[j].cellFilter) {
					scope.value = renderedData;
					renderedData = scope.$eval('value | ' + grid.columnDefs[j].cellFilter);
				}

				//as soon as search term is found, add to match and move to next dataItem
				if (renderedData && renderedData.toString().toLowerCase().indexOf(lquery) > -1) {
					matches.push(dataItem);
					break;
				}
			}
		}
		scope.$destroy();

		return matches;
	};
}
