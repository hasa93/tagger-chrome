angular.module('TaggerApp')
.controller('LoginCtrl', function($scope, $rootScope, $state, $timeout, AuthService){
	console.log("In login ctrl...");

	$scope.user = {uname: '', passwd: ''};

	$scope.notification = {
		type: 'error',
		message: 'hola!',
		visible: false
	}

	$scope.showLoginFailure = function(){
		$scope.notification.message = "Invalid Login!";
		$scope.notification.visible = true;

		$timeout(function(){
			$scope.notification.visible = false;
		}, 3000);
	}

	$scope.closeNotification = function(message){
		$scope.notification.visible = false;
	}

	$scope.logIn = function(){
		$rootScope.isValid = true;

		$rootScope.$broadcast('SUBMIT');

		if($rootScope.isValid){
			AuthService.logIn($scope.user).then(function(user){
				console.log(user);

				if(!user.profile){
					console.log('Login failure');
					$scope.showLoginFailure();
					return;
				}

				if(user.profile.type == 'mgr'){
					$state.go('admin');
				}
				else if(user.profile.type == 'csh'){
					$state.go('cashier');
				}

			}, function(error){
				$scope.showLoginFailure();
				console.log(error);
			});
		}
	}
});