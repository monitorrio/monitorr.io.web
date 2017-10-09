import moment from 'moment';

export default class OverviewController {
	static get $inject() {
		return ['$scope', '$stateParams', '$q', 'ChartJs', 'logs', 'helpersService', 'loaderService', 'enumService'];
	}

	constructor($scope, $stateParams, $q, chartJs, logService, helpersService, loaderService, enumService) {
		this.$q = $q;
		this.$scope = $scope;
		this.chartJs = chartJs;
		this.logService = logService;
		this.helpersService = helpersService;
		this.loaderService = loaderService;
		this.enumService = enumService;

		this.logId = $stateParams.id;
		this.chartLabels = [];
		this.chartData = [];
		this.logOverview = {};
		this.filter = '12h';
		this.options = {
			maintainAspectRatio: false,
			scales: {
				yAxes: [{
					stacked: true
				}]
			}
		};
		this.datasetOverride = [
			{
				borderWidth: 1,
				type: 'bar',
				backgroundColor: '#f39c12'
			}
		];
	}

	$onInit() {
		this.updateOverview();
	}

	getOverview(fromDate) {
		this.loaderService.show();
		this.chartLabels = [];
		this.chartData = [];

		let timeZoneOffset = moment().utcOffset() / 60;

		this.$q.all([
			this.logService.getAggregatedErrorsCount(this.logId, timeZoneOffset, fromDate),
			this.logService.getLogOverview(this.logId, fromDate)
		])
			.then(result => {
				let chartData = result[0].data.Model;
				this.chartData.push([]);
				chartData.forEach((item) => {
					this.chartLabels.push(item.PeriodName);
					this.chartData[0].push(item.Count);
				});

				this.logOverview = result[1].data.Model;

				this.hideOverview = result[1].data.Model.TotalErrors === 0;

				this.loaderService.hide();
			});

	}

	updateOverview() {
		let dateFrom = this.parseOptionValue(this.filter);
		if (dateFrom) {
			dateFrom = dateFrom.toISOString();
		}
		this.getOverview(dateFrom);
	}

	parseOptionValue(filter) {
		let filterPart = filter.match(/\d+|[mhd]/g);

		if (!filterPart) {
			return null;
		}
		return this.helpersService.toDateFrom(filterPart[0], filterPart[1]);
	}

	filterSeverity() {
		let newFilter = {severity: this.enumService.severity.critical};
		this.raiseErrorTableFilterUpdateEvent(newFilter);
	}

	filterByUsers() {
		let newFilter = {withUserOnly: true};
		this.raiseErrorTableFilterUpdateEvent(newFilter);
	}

	filterByBrowser(name) {
		let newFilter = {browser: name};
		this.raiseErrorTableFilterUpdateEvent(newFilter);
	}

	raiseErrorTableFilterUpdateEvent(newFilter) {
		this.$scope.$emit('errorTableFilterUpdate', newFilter);
	}

	resetFilter() {
		this.$scope.$emit('errorTableFilterUpdate', {});
	}
}
