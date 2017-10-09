import $ from 'jquery';
import angular from 'angular';
import usersHtml from './users.html';

import inviteUserController from './invite-user.controller';
import inviteUserHtml from './invite-user.html';

export default Users;

Users.$inject = ['$rootScope', '$stateParams', 'lookups', 'logs', 'sweet', '$uibModal',
	'accountService', 'loaderService'];

function Users($rootScope, $stateParams, lookups, logService, sweetAlert, $uibModal, accountService, loaderService) {
	let logId;
	return {
		restrict: 'E',
		scope: {
			logId: '='
		},
		template: usersHtml,
		link: function (scope, elem, attrs) {
			let totalRecords = 0;
			let table;

			logId = $stateParams.id;

			function dataTableSearchParameters(aoData) {
				aoData.push({
					'name': 'totalRecords',
					'value': totalRecords
				}, {
					'name': 'LogId',
					'value': logId
				});
			}

			function createInviteAgainButton(row) {
				let $button = $('<button>');
				$button.addClass('btn btn-primary invite-again');
				$button.html('Invite Again');
				$button.attr('data-id', row.Id);
				return $button[0].outerHTML;
			}

			$('#dt-users').on('click', '.invite-again', function () {
				let userId = $(this).data('id');
				inviteAgain(userId);
			});

			function drawTable() {
				$('users')
					.on('click', '.control-content input', function () {
						let tr = $(this).closest('tr');
						let row = table.row(tr).data();

						let actionType = $(this).data('action');
						let value = $(this).prop('checked');
						let canWrite, canRead;
						if (!row.LogAccess) {
							row.LogAccess = {};
						}
						if (actionType === 'read') {
							canRead = value;
							canWrite = row.LogAccess && row.LogAccess.CanWrite || false;
						} else if (actionType === 'write') {
							canWrite = value;
							canRead = row.LogAccess && row.LogAccess.CanRead || false;
						}

						logService.addUserAccess({
							logId: $stateParams.id,
							userId: row.Id,
							canRead: canRead,
							canWrite: canWrite
						})
							.then(() => {
								sweetAlert.show('Manage Users', 'The access has been updated.', 'success');
							})
							.catch((e) => {
								sweetAlert.show('Manage Users', e.data.Message, 'error');
							})
							.finally(() => {
								table.ajax.reload();
							});
					});

				table = $('#dt-users').DataTable({
					dom: "<'dt-toolbar row'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'" + toolbar + '>r>' + 't'
					+ "<'dt-toolbar-footer row'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
					iShowPages: 7,
					iDisplayLength: 15,
					bProcessing: true,
					bServerSide: true,
					bDestroy: true,
					autoWidth: false,
					responsive: true,
					sAjaxSource: '/users/search',
					order: [
						[1, 'desc']
					],
					language: {
						emptyTable: 'The user is not found. You could invite user with using "Invite User" button.'
					},
					fixedColumns: true,
					rowId: 'Guid',
					aoColumnDefs: [
						{
							bSortable: true,
							aTargets: '_all'
						}
					],
					aoColumns: [
						{
							mDataProp: 'Name'
						},
						{
							mDataProp: 'Email',
							mRender: function (data, type, row) {
								return data;
							}
						},
						{
							mDataProp: 'IsActive',
							class: 'icon-content',
							mRender: function (data, type, row) {
								if (data) {
									return '<i class="u-active fa fa-check"></i>';
								} else {
									return '<i class="u-not-active fa fa-times"></i>';
								}
							}
						},
						{
							class: 'control-content',
							orderable: false,
							searchable: false,
							data: null,
							width: '60px',
							defaultContent: '<input data-action="read" type="checkbox">'
						},
						{
							class: 'control-content',
							orderable: false,
							searchable: false,
							data: null,
							width: '60px',
							defaultContent: '<input data-action="write" type="checkbox">'
						},
						{
							class: 'control-content',
							orderable: false,
							searchable: false,
							mDataProp: 'IsActive',
							width: '135px',
							mRender: function (data, type, row) {
								if (!data) {
									return createInviteAgainButton(row);
								} else {
									return '';
								}
							}
						}
					],
					fnServerData: function (sSource, aoData, fnCallback) {
						let inputText = $('.dataTables_filter input').val();
						if (inputText === '' || inputText.length >= 1) {
							lookups.searchUsers(sSource, angular.toJson(aoData), function (response, status, xhr) {
								totalRecords = response.data.iTotalRecords;
								fnCallback(response.data, status, xhr);
							});
						}
					},
					fnServerParams: dataTableSearchParameters,
					preDrawCallback: function () {
					},
					fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
						if (!aData.LogAccess) {
							return;
						}

						let canRead = aData.LogAccess.CanRead;
						let canWrite = aData.LogAccess.CanWrite;

						let $row = $(nRow);

						if (canRead) {
							let $checkbox = $row.children('.control-content').find("[data-action='read']");
							$checkbox.prop('checked', true);
						}

						if (canWrite) {
							let $checkbox = $row.children('.control-content').find("[data-action='write']");
							$checkbox.prop('checked', true);
						}
					}
				});
			}

			scope.showInviteUserModal = function () {
				$uibModal.open({
					animation: true,
					ariaLabelledBy: 'modal-title',
					ariaDescribedBy: 'modal-body',
					template: inviteUserHtml,
					controller: inviteUserController,
					controllerAs: 'ctrl',
					resolve: {
						logId: function () {
							return logId;
						}
					}
				});
			};

			function inviteAgain(userId) {
				loaderService.show();
				let inviteModel = {
					'userId': userId
				};

				accountService.inviteUserAgain(inviteModel)
					.then(() => {
						loaderService.hide();
						sweetAlert.show('Invite User', 'The user has been invited.', 'success');

					})
					.catch((e) => {
						sweetAlert.show('Invite User', e.data.Message, 'error');
						loaderService.hide();
					});
			}

			drawTable();
		}
	};
}
