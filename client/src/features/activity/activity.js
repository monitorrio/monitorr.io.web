import $ from 'jquery';
import angular from 'angular';
import activityHtml from './activity.html';

export default Activity;

Activity.$inject = ['$rootScope', '$compile', 'ENV', 'helpersService'];

function Activity($rootScope, $compile, ENV, helpersService) {
	return {
		restrict: 'E',
		scope: {
			settings: '='
		},
		template: activityHtml,

		link: function (scope, elem, attrs) {
			scope.filters = {};

			scope.datePicker = {};
			scope.datePicker.max = new Date();
			scope.datePicker.date = defaultDatePickerValues();
			scope.datePicker.options = {
				applyClass: 'btn-primary',
				locale: {
					format: 'MM-DD-YYYY hh:mm A',
					cancelLabel: 'Cancel',
					customRangeLabel: 'Custom range'
				},
				timePicker: true,
				timePickerIncrement: 1,
				eventHandlers: {
					'apply.daterangepicker': function (ev, picker) {
						scope.filters.start = ev.model.startDate.toISOString();
						scope.filters.end = ev.model.endDate.toISOString();
						reloadTable();
					}
				}
			};
			let table;

			$rootScope.$on('activityTableFilterUpdate', (event, newFilters) => {
				scope.filters = newFilters;
				reloadTable();
			});

			$rootScope.$on('openActivityDetails', (event, errorGuid) => {
				let node = table.row(`#${errorGuid}`).node();
				let expandCell = $(node).find('td').first();
				expandCell.click();
				$('html,body').animate({
					scrollTop: $(`#${errorGuid}`).offset().top
				}, 'slow');
			});

			scope.$on('suspend', function () {
				scope.$$watchers = [];
			});

			function drawTable() {
				table = $('#dt-activity').DataTable({
					dom: '<"dt-wrapper"<"dt-header"<"dt-filter"f><"date-filter"><"dt-info"i><"dt-paging"p>>rt<"dt-pull-right"l>',
					iShowPages: 7,
					processing: true,
					serverSide: true,
					ajax: {
						url: ENV.BASE_API + '/activity/search',
						data: (params) => {
							params.logId = scope.settings.LogId;
							params.severity = scope.filters.severity || null;
							params.browser = scope.filters.browser || null;
							params.withUserOnly = scope.filters.withUserOnly || false;
							params.start = scope.filters.start || null;
							params.end = scope.filters.end || null;
							params.host = scope.filters.host || null;
							params.statusCode = scope.filters.statusCode || null;
							params.type = scope.filters.type || null;
						},
						dataSrc: function (json) {
							let columnFilters = JSON.parse(json.filters);
							for (let [key, value] of Object.entries(columnFilters)) {
								let $filter = $(`select.filter[data-name="${key}"]`);
								let selectedValue = $filter.val();
								$filter.html('');
								$filter.append($('<option value="">All</option>'));
								for (let o in value) {
									if (value.hasOwnProperty(o)) {
										$filter.append($(`<option>${value[o]}</option>`).attr('value', value[o]));
									}
								}
								$filter.val(selectedValue);
							}
							return json.data;
						}
					},
					destroy: true,
					autoWidth: false,
					responsive: true,
					order: [
						[1, 'desc']
					],
					fixedColumns: true,
					pagingType: 'simple',
					lengthChange: false,
					pageLength: 100,
					rowId: 'guid',
					language: {
						search: '',
						searchPlaceholder: 'Type term for searching',
						lengthMenu: 'Display _MENU_ records per page',
						zeroRecords: 'Nothing found - sorry',
						info: '_START_ - _END_ of _TOTAL_',
						infoEmpty: 'No records available',
						infoFiltered: '(filtered from _MAX_ total records)'
					},
					columnDefs: [{
						bSortable: true,
						aTargets: '_all'
					}],
					columns: [{
						class: 'details-control ',
						orderable: false,
						searchable: false,
						data: null,
						defaultContent: '<i class="fa fa-plus-circle" aria-hidden="true"></i>',
						width: '45px'
					}, {
						data: 'time',
						render: function (data, type, row) {
							return row.relativeTime;
						},
						width: '90px'
					}, {
						data: 'url',
						'orderable': false
					}, {
						data: 'browser',
						render: function (data) {
							let iconClass = helpersService.getBrowserIconClass(data);
							let html = `<div class="table-browser-icon"><i class="fa ${iconClass}"></i></div>`;
							return html;

						},
						width: '100px'
					}, {
						data: 'statusCode',
						render: function (data, type, row) {
							let $html = $(`<span>${data}</span>`);
							//noinspection JSDeprecatedSymbols
							if (row.isCustom) {
								let icon = '<span class="table-custom-icon"><i class="fa fa-exclamation-circle" title="Custom error"></i></span>';
								$html.append(icon);
							}

							return $html.html();
						},
						width: '80px'
					}, {
						data: 'host',
						render: function (data, type, row) {
							return data;
						},
						width: '15%',
						'orderable': false
					}, {
						data: 'type',
						render: function (data, type, row) {
							return data;
						},
						'orderable': false
					}, {
						data: 'message',
						render: function (data, type, row) {
							return data;
						},
						'orderable': false
					}],
					rowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
						if (aData.statusCode === 500) {
							$('td:eq(0)', nRow).addClass('td-danger');
						} else {
							$('td:eq(0)', nRow).addClass('td-warning');
						}
					},
					drawCallback: function (oSettings) {
						oSettings._bInitComplete = true; // fix for prevent call parent(jquery) Init
						let el = angular.element('<input date-range-picker class="form-control date-picker input-sm" type="text" placeholder="Select dates for filtering" options="datePicker.options" max="datePicker.max" ng-model="datePicker.date"/>');
						let html = $compile(el)(scope);
						$('.date-filter').html(html);
					}
				});
			}

			drawTable();

			let searchDelay = null;

			$('.dataTables_filter input')
				.unbind()
				.bind('input', function (e) {
					clearTimeout(searchDelay);
					let that = this;

					if (this.value.length >= 3 || e.keyCode === 13) {
						searchDelay = setTimeout(function () {
							table.search(that.value).draw();
						}, 500);
					}
					if (this.value === '') {
						table.search('').draw();
					}
					return;
				});

			$('#dt-activity').find('tbody').on('click', 'td.details-control', function () {
				let tr = $(this).closest('tr');
				let row = table.row(tr);

				if (row.child.isShown()) {
					row.child.hide();
					this.innerHTML = '<i class="fa fa-plus-circle" aria-hidden="true"></i>';
				} else {
					renderErrorDetails(row.data(), row);
					row.child.show();
					this.innerHTML = '<i class="fa fa-minus-circle" aria-hidden="true"></i>';
				}
			});

			$('select.filter').on('click', function (ev) {
				ev.stopPropagation();
			});

			$('select.filter').on('change', function () {
				$(this).toggleClass('filter-applied', $(this).find('option:selected').val() !== '');
				reloadTable();
			});

			function renderErrorDetails(data, row) {
				if ($rootScope.$$phase) {
					scope.$eval(function () {
						compileErrorDetails(data, row);
					});
				} else {
					scope.$apply(function () {
						compileErrorDetails(data, row);
					});
				}
			}

			function compileErrorDetails(data, row) {
				let errorDetailsComp = angular.element('<error-details error="error"></error-details>');
				let newScope = scope.$new(true);
				newScope.error = data;
				let html = $compile(errorDetailsComp)(newScope);
				row.child(html);
			}

			function reloadTable() {
				table.ajax.reload();
			}

			function defaultDatePickerValues() {
				return {startDate: null, endDate: null};
			}

			scope.resetFilters = function () {
				scope.filters = {};
				scope.datePicker.date = defaultDatePickerValues();
				reloadTable();
			};

			scope.filterCssClass = function (model) {
				return {
					'filter-applied': !!model
				};
			};
		}
	};
}
