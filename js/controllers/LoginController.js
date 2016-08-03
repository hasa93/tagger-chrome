angular.module('TaggerApp')
.controller('LoginCtrl', function($scope, $state){
	console.log("In login ctrl...");

	$scope.user = {uname: '', pass: ''};

	$scope.logIn = function(){
		console.log($scope.user.uname);
		console.log($scope.user.pass);

		if($scope.user.uname == "cashier" && $scope.user.pass == "cashier"){
			console.log("Switching to cashier...");
			$state.go('main.posview');
		}
	}
});