angular.module('TaggerApp')
.controller('AdminCtrl', function($scope, $state){
	$scope.header = "Admin Panel";

	$scope.goToProducts = function(){
		console.log("Switching to Product Managment view...");
		$scope.header = "Manage Products";
		$state.go('cashier.Productmngview');
	}

	$scope.goToDashboard = function(){
		console.log('Switching to admin dashboard...');
		$scope.header = "Dashboard";
		$state.go("admin.dashboard");
	}

	$scope.goToCashierMgtView = function(){
		console.log('Switching to cashier management view...');
		$scope.header = "Manage Cashiers";
		$state.go("admin.cashiermgtview");
	}

	$scope.logout = function(){
		$state.go("cashier");
	}
});