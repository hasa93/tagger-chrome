angular.module('TaggerApp')
.controller('CashierCtrl', function($rootScope, $scope, $state, RetailService){
	console.log("In MainCtrl...");

	$rootScope.readerDisconnected = true;

	$scope.header = "Cashier Panel";
	$scope.showVoucherForm = false;

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

	$scope.showVoucherDialog = function(){
		console.log("Showing voucher...");
		$scope.showVoucherForm = true;
	}

	$scope.hideVoucherDialog = function(){
		console.log("Hide voucher...");
		$scope.showVoucherForm = false;
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