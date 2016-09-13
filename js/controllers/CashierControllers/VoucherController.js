angular.module('TaggerApp')
.controller('VoucherCtrl', function($rootScope, $scope, $state, $timeout, RetailService){

	$scope.showValidation = false;
	$scope.showExpired = false;
	$scope.showInvalidExpiry = false;
	$scope.showCreate = false;

	$scope.voucher = $state.params.voucher;

	if($scope.voucher  == undefined){
		$scope.voucher = {};

		var now = new Date();
		now.setDate(now.getDate() + 7);

		$scope.voucher.expiry = now;
	}

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

	$scope.closeNotification = function(message){
		$scope.showExpired = false;
		$scope.showInvalidExpiry = false;
		$scope.showCreated = false;
	}

	$scope.createVoucher = function(){

		var now = new Date();
		var expiry = new Date($scope.voucher.expiry);

		now = now.getTime();
		expiry = expiry.getTime();

		if(expiry <= now){
			$scope.showInvalidExpiry = true;
			$timeout(function(){
				$scope.showInvalidExpiry = false;
			}, 4000);
			return;
		}

		$rootScope.isValid = true;
		$rootScope.$broadcast('SUBMIT');

		console.log($scope.voucher);

		if($rootScope.isValid){
			$scope.voucher.expiry = $scope.voucher.expiry.toJSON().slice(0,10);
			console.log($scope.voucher);

			RetailService.createVoucher($scope.voucher).then(function(response){
				console.log(response);

				$scope.newVoucherId = response.voucherId;
				$scope.showCreated = true;

				$scope.voucher = {};

				var now = new Date();
				now.setDate(now.getDate() + 7);

				$scope.voucher.expiry = now;
			}, function(error){
				console.log(error.error);
			});
		}
	}

	$scope.claimVoucher = function(){
		var now = new Date();
		var exp = new Date($scope.voucher.expiry);

		now = now.getTime();
		exp = exp.getTime();

		if(exp < now){
			$scope.showExpired = true;
			$timeout(function(){
				$scope.showExpired = false;
			}, 4000);
		}

		RetailService.claimVoucher($scope.voucher).then(function(successs){
			$state.go('cashier.posview');
		}, function(error){
			console.log(error);
		});
	}

});