angular.module('TaggerApp')
.controller('VoucherCtrl', function($scope){
	
	$scope.showDialog = false;

	$scope.dialogProfile = {};

	$scope.addVoucher = function(){
		$scope.showDialog = true;

		$scope.dialogProfile.color = 'metro-peterriver';
		$scope.dialogProfile.name = 'addVoucher';
		$scope.dialogProfile.icon = 'description';
		$scope.dialogProfile.title = 'Create Voucher';
	}

	$scope.validateVoucher = function(){
		$scope.showDialog = true;

		$scope.dialogProfile.color = 'metro-sunflower';
		$scope.dialogProfile.name = 'validateVoucher';
		$scope.dialogProfile.icon = 'assignment_turned_in';
		$scope.dialogProfile.title = 'Validate Voucher';
	}

	$scope.createVoucher = function(){
		$scope.showDialog = false;
	}
});