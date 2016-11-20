angular.module('TaggerApp')
.controller('VoucherCtrl', function($rootScope, $scope, $state, $timeout, RetailService){

	$scope.voucher = $state.params.voucher;
	console.log($state.params);

	if($scope.voucher  == undefined){
		$scope.voucher = {};
		var now = new Date();
		now.setDate(now.getDate() + 7);
		$scope.voucher.expiry = now;
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