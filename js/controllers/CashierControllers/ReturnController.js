angular.module('TaggerApp')
.controller('ReturnCtrl', function($scope, $state){
	$scope.searchInvoice = function(){
		//Check availability of invoice here
		$state.go('cashier.returnform');
	}

	$scope.goToPos = function(){
		$state.go('cashier.posview');
	}
});