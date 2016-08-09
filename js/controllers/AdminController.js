angular.module('TaggerApp')
.controller('AdminCtrl', function($scope){
		$scope.header = "Admin Panel";	
	$scope.goToProducts = function(){
		console.log("Switching to Product Managment view...");
		$scope.header = "Manage Products";
		$state.go('main.Productmngview');
	}
	//Admin main view logic goes here
});