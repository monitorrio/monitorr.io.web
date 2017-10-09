LoginController.$inject = [
	'$scope', '$state', 'localStorageService', 'auth', 'principal', 'loaderService'
];

export default function LoginController($scope, $state, store, auth, principal, loaderService) {
	$scope.loginFailed = false;
	$scope.loginErrorMessage = '';

	$scope.login = function () {
		$scope.loginFailed = false;
		$scope.loading = true;

		loaderService.show();

		let credentials = {
			email: $scope.email,
			password: $scope.password
		};

		principal.signin(credentials)
			.then(() => {
				$state.go('main.dash');
			})
			.catch(e => {
				showError(e.error_description);
			})
			.finally(() => {
				loaderService.hide();
			});
	};

	function showError(errorText) {
		$scope.loading = false;
		$scope.loginFailed = true;
		$scope.loginErrorMessage = errorText;
	}

	$scope.signGoogle = function () {
		signOAuth('google-oauth2');
	};

	$scope.signGithub = function () {
		signOAuth('github');
	};

	$scope.signMicrosoft = function () {
		signOAuth('windowslive');
	};

	function signOAuth(connection) {
		$scope.loading = true;
		loaderService.show();
		principal.signOAuth(connection)
			.then(() => {
				$state.go('main.dash');
			})
			.catch(e => {
				showError(e.error_description || 'Something went wrong.');
			})
			.finally(() => {
				loaderService.hide();
			});
	}
}
