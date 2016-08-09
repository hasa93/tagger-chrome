angular.module('TaggerApp')
.controller('VoucherCtrl', function($scope, $state){

	$scope.goToCreateVoucher = function(){
		$state.go('cashier.createvoucher');
	}

	$scope.goToValidateVoucher = function(){
		$state.go('cashier.validatevoucher');
	}
});