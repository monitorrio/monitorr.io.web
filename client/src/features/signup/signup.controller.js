SignupController.$inject = [
	'$scope', '$state', 'localStorageService', 'auth', 'principal', 'loaderService', 'ENV'
];

export default function SignupController($scope, $state, store, auth, principal, loaderService, ENV) {
	$scope.signupFailed = false;
	$scope.signupErrorMessage = '';
	$scope.minPasswordRule = 6;

	$scope.signup = function () {
		if ($scope.password !== $scope.confirmPassword) {
			showError('Password and Confirm Password have to be the same.');
			return;
		}

		if ($scope.password.length < $scope.minPasswordRule) {
			showError(`The minimum password size is ${$scope.minPasswordRule}`);
			return;
		}
		$scope.loading = true;
		$scope.signupFailed = false;
		loaderService.show();
		let data = {
			email: $scope.email,
			password: $scope.password,
			user_metadata: {name: $scope.name}
		};

		principal.signup(data)
			.then(()=> {
				$state.go('main.dash');
			})
			.catch(e=> {
				showError(e.description);
			})
			.finally(()=> {
				loaderService.hide();
			});
	};

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
		principal.signOAuth(connection)
			.catch(e=> {
				showError(e.error_description);
				loaderService.hide();
			});
	}

	function showError(errorText) {
		$scope.loading = false;
		$scope.signupFailed = true;
		$scope.signupErrorMessage = errorText;
	}
}
