angular.module('TaggerApp')
.controller('VoucherCtrl', function($rootScope, $scope, $state, RetailService){

	$scope.showValidation = false;

	$scope.voucher = $state.params.voucher;

	console.log($scope.voucher);

	$scope.goToCreateVoucher = function(){
		$state.go('cashier.createvoucher');
	}

	$scope.confirmValidation = function(){
		RetailService.getVoucher($scope.voucher.id).then(function(response){
			if(response.status === 'FAILURE') {
				$scope.voucher.id = "No Voucher Found!"
			}
			else{
				$state.go('cashier.validatevoucher', { voucher : response.data });
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
		$rootScope.isValid = true;

		$rootScope.$broadcast('SUBMIT');

		console.log($scope.voucher);

		if($rootScope.isValid){
			$scope.voucher.expiry = $scope.voucher.expiry.toJSON().slice(0,10);
			console.log($scope.voucher);

			RetailService.createVoucher($scope.voucher).then(function(response){
				$scope.voucher = {};
			}, function(error){
				console.log(error.error);
			});
		}
	}

	$scope.claimVoucher = function(){
		RetailService.claimVoucher($scope.voucher);
		$state.go('cashier.posview');
	}

});