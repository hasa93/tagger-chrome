angular.module('TaggerApp')
.controller('VoucherCtrl', function($scope){
	
	$scope.showAddForm = false;
	$scope.showValidateForm = false;

	$scope.showAddDialog = function(){
		$scope.showAddForm = true;
	}

	$scope.showValidateDialog = function(){
		$scope.showValidateForm = true;
	}

	$scope.cancel = function(){
		$scope.showAddForm = false;
		$scope.showValidateForm = false;
	}
});