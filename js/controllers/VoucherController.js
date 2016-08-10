angular.module('TaggerApp')
.controller('VoucherCtrl', function($scope, $state){

	$scope.showValidation = false;

	$scope.goToCreateVoucher = function(){
		$state.go('cashier.createvoucher');
	}

	$scope.confirmValidation = function(){
		$state.go('cashier.validatevoucher');
	}

	$scope.promptValidation = function(){
		$scope.showValidation = true;
	}

	$scope.cancelValidation = function(){
		$scope.showValidation = false;
	}
});