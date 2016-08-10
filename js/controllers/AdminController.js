angular.module('TaggerApp')
.controller('AdminCtrl', function($scope ,$state){
		$scope.header = "Admin Panel";	
	$scope.goToProducts = function(){
		console.log("Switching to Product Managment view...");
		$scope.header = "Manage Products";
		$state.go('cashier.Productmngview');
	}
	
	//Admin main view logic goes here
});