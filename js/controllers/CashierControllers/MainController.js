angular.module('TaggerApp')
.controller('CashierCtrl', function($rootScope, $scope, $state, RetailService){
	console.log("In MainCtrl...");

	$rootScope.readerDisconnected = true;

	$scope.header = "Cashier Panel";

	$scope.hideAllDialogs = function(){
		console.log("Hiding dialogs...");
		$scope.showVoucherCreateForm = false;
		$scope.showVoucherClaimForm = false;
	}

	$scope.logout = function(){
		console.log("Logging out...");
		RetailService.resetInvoice();
		$state.go('login');
	}

	$scope.goToPosView = function(){
		console.log("Switching to POS...");
		$scope.hideAllDialogs();
		$scope.header = "POS View";
		$state.go('cashier.posview');
	}

	$scope.showVoucherCreateDialog = function(){
		console.log("Showing voucher...");
		$scope.hideAllDialogs();
		$scope.showVoucherCreateForm = true;
	}

	$scope.showVoucherClaimDialog = function(){
		$scope.hideAllDialogs();
		$scope.showVoucherClaimForm = true;
	}

	$scope.confirmValidation = function(){

	}

	$scope.goToReturnsView = function(){
		console.log("Switching to Return view...");
		$scope.hideAllDialogs();
		$scope.header = "Return Process";
		$state.go('cashier.returnview');
	}
});