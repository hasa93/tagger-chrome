angular.module('TaggerApp')
.controller('VoucherCtrl', function($scope, $state){
	
	$scope.showAddForm = false;
	$scope.showValidateForm = false;

	var vouchers = [];

	$scope.showAddDialog = function(){
		$scope.showAddForm = true;
	}

	$scope.showValidateDialog = function(){
		$state.go('main.vouchervalidation');
		//$scope.showValidateForm = true;
	}

	$scope.cancel = function(){
		$scope.showAddForm = false;
		$scope.showValidateForm = false;
	}
});