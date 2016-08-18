angular.module('TaggerApp')
.controller('VoucherCtrl', function($scope, $state, RetailService){

	$scope.showValidation = false;

	$scope.voucher = {};

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

	$scope.createVoucher = function(){
		$scope.voucher.expiry = $scope.voucher.expiry.toJSON().slice(0,10);
		console.log($scope.voucher);

		RetailService.createVoucher($scope.voucher).then(function(response){
			$scope.voucher = {};
		}, function(error){
			console.log(error.error);
		});
	}

});