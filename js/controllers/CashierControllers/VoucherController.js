angular.module('TaggerApp')
.controller('VoucherCtrl', function($scope, $state, RetailService){

	$scope.showValidation = false;

	$scope.voucher = {};

	$scope.goToCreateVoucher = function(){
		$state.go('cashier.createvoucher');
	}

	$scope.confirmValidation = function(){
		RetailService.getVoucher($scope.voucher.id).then(function(response){
			console.log(response);
			if(response.data.length == 0) {
				$scope.voucher.id = "No Voucher Found!"
			}
			else{
				$scope.voucher.details = response.data[0];
				console.log($scope.voucher);
				$state.go('cashier.validatevoucher');
			}
		}, function(err){
			console.log(err);
		});

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