angular.module('TaggerApp')
.controller('CashierCtrl', function($rootScope, $scope, $state, RetailService){
	console.log("In MainCtrl...");

	$rootScope.readerDisconnected = true;

	$scope.header = "Cashier Panel";

	$scope.logout = function(){
		console.log("Logging out...");
		RetailService.resetInvoice();
		$state.go('login');
	}

	$scope.goToPosView = function(){
		console.log("Switching to POS...");
		$scope.header = "POS View";
		$state.go('cashier.posview');
	}

	$scope.goToCreateVoucher = function(){
		$scope.header = "Issue Voucher";
		$state.go('cashier.createvoucher');
	}

	$scope.goToValidateVoucher = function(){
		$scope.header = "Validate Voucher";
		$state.go('cashier.validatevoucher');
	}

	$scope.goToReturnsView = function(){
		console.log("Switching to Return view...");
		$scope.header = "Return Process";
		$state.go('cashier.returnview');
	}
});