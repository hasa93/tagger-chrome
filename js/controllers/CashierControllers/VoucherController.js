angular.module('TaggerApp')
.controller('VoucherCtrl', function($scope, $state, $timeout, RetailService){

	$scope.showValidation = false;
	$scope.showNotification = false;

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
		$scope.voucher.expiry = $scope.voucher.expiry.toJSON().slice(0,10);
		console.log($scope.voucher);

		RetailService.createVoucher($scope.voucher).then(function(response){
			$scope.voucher = {};
			$scope.showNotification = true;
			$timeout(function(){
				$scope.showNotification = false;
			}, 3000);
		}, function(error){
			console.log(error.error);
		});
	}

});