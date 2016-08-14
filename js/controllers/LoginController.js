angular.module('TaggerApp')
.controller('LoginCtrl', function($scope, $state, AuthService){
	console.log("In login ctrl...");

	$scope.user = {uname: '', pass: ''};

	$scope.logIn = function(){
		AuthService.logIn($scope.user.uname, $scope.user.pass).then(function(user){
			console.log('LogIn success...');

			if(user.role === 'admin'){
				$state.go('admin');
			}
			else if(user.role === 'cashier'){
				$state.go('cashier');
			}
		}, function(error){
			console.log(error);
		});
	}
});