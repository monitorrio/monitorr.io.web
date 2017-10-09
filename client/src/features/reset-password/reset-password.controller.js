ResetPasswordController.$inject = [
	'$scope', '$state', 'localStorageService', 'auth', 'principal', 'loaderService'
];

export default function ResetPasswordController($scope, $state, store, auth, principal, loaderService) {
	$scope.resetFailed = false;
	$scope.resetErrorMessage = '';
	$scope.resetSent = false;
	$scope.email = '';

	$scope.reset = function () {

		loaderService.show();

		principal.resetPassword($scope.email)
			.then(() => {
				$scope.resetSent = true;
			})
			.catch(e=> {
				showError(e.name);
			})
			.finally(() => {
				loaderService.hide();
			});
	};

	function showError(errorText) {
		$scope.resetFailed = true;
		$scope.resetErrorMessage = errorText;
	}
}
