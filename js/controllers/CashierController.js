angular.module('TaggerApp')
.controller('CashierCtrl', function($scope, $state){
	console.log("In MainCtrl...");

	$scope.header = "Home";	

	$scope.logout = function(){
		console.log("Logging out...");
		$state.go('login');
	}

	$scope.goToPosView = function(){
		console.log("Switching to POS...");
		$scope.header = "POS View";
		$state.go('cashier.posview');
	}

	$scope.goToVoucherView = function(){
		console.log("Switching to Voucher view...");
		$scope.header = "Voucher Process";
		$state.go('cashier.voucherview');
	}

	$scope.goToReturnsView = function(){
		console.log("Switching to Return view...");
		$scope.header = "Return Process";
		$state.go('cashier.returnview');
	}
	
});