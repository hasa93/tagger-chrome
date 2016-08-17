angular.module('TaggerApp')
.controller('LoginCtrl', function($scope, $state, AuthService){
	console.log("In login ctrl...");

	$scope.user = {uname: '', passwd: ''};

	$scope.logIn = function(){
		AuthService.logIn($scope.user).then(function(user){
			console.log('LogIn success...');
			
			if(user.profile.type == 'mgr'){
				$state.go('admin');
			}
			else if(user.profile.type == 'csh'){
				$state.go('cashier');
			}
		}, function(error){
			console.log(error);
		});
	}
});