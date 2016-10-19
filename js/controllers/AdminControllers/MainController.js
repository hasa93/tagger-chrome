angular.module('TaggerApp')
.controller('AdminCtrl', function($scope, $state){
	$scope.header = "Admin Panel";

	$scope.goToProductsMgtView = function(){
		console.log("Switching to Product Managment view...");
		$scope.header = "Manage Products";
		$state.go('admin.productsmgtview');
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

	$scope.goToStats = function(){
		$scope.header = "Stat View";
		$state.go("admin.productstats");
	}

	$scope.logout = function(){
		$state.go("login");
	}
});