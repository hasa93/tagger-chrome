angular.module('TaggerApp')
.controller('LoginCtrl', function($rootScope, $scope, $state, $timeout, AuthService, MessengerService, config){
	console.log("In login ctrl...");
	MessengerService.connect();

	$scope.user = {uname: '', passwd: ''};

	$scope.showInvalidLogin = false;
	$scope.showResetFailed = false;
	$scope.showResetSuccess = false;

	$scope.closeNotifications = function(){
		$scope.showInvalidLogin = false;
		$scope.showResetFailed = false;
		$scope.showResetSuccess = false;
	}


	$scope.logIn = function(){
		AuthService.logIn($scope.user).then(function(response){
			console.log(response);
			if(response.profile === undefined){
				$scope.showInvalidLogin = true;
			}
			else if(response.profile.type === 'mgr'){
				$state.go('admin');
			}
			else if(response.profile.type === 'csh'){
				console.log(AuthService.getUserProfile());
				MessengerService.sendLogin(AuthService.getUserProfile());
				$state.go('cashier');
			}
		}, function(err){
			$scope.showInvalidLogin = true;
			console.log(err);
		});

		$timeout(function(){
			$scope.closeNotifications()
		}, 4000);
	}

	$scope.reset = function(){
		$rootScope.isValid = true;
		$rootScope.$broadcast('SUBMIT');

		if($rootScope.isValid){
			console.log($scope.user.email);
			AuthService.reset($scope.user.email).then(function(result){
				if(result.status === "SUCCESS"){
					$scope.showResetSuccess = true;
				}
				else{
					$scope.showResetFailed = true;
				}
			}, function(error){
				$scope.showResetFailed = true;
			});

			$timeout(function(){
				$scope.closeNotifications();
			}, 4000);
		}
	}

});