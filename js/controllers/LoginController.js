angular.module('TaggerApp')
.controller('LoginCtrl', function($rootScope, $scope, $state, $timeout, AuthService, config){
	console.log("In login ctrl...");

	$scope.user = {uname: '', passwd: ''};
	$scope.notification = {
		message: 'Invalid Login!',
		type: 'error',
		show: false
	}

	$scope.closeNotification = function(){
		$scope.notification.show = false;
	}

	$scope.showNotification = function(){
		$scope.notification.show = true;
		$timeout(function(){
			$scope.notification.show = false;
		}, 3000);
	}

	$scope.logIn = function(){
		AuthService.logIn($scope.user).then(function(response){
			console.log(response);
			if(response.profile === undefined){
				$scope.showNotification();
			}
			else if(response.profile.type === 'mgr'){
				config.locals.branchName = response.profile.branchName;
				$state.go('admin');
			}
			else if(response.profile.type === 'csh'){
				config.locals.branchName = response.profile.branchName;
				console.log(config.locals);
				$state.go('cashier');
			}
		}, function(err){
			console.log(err);
		});
	}

});