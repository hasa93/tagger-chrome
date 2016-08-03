angular.module('TaggerApp')
.controller('MainCtrl', function($scope, $state){
	console.log("In MainCtrl...");

	$scope.header = "Home";	

	$scope.goToPos = function(){
		console.log("Switching to POS...");
		$scope.header = "POS View";
		$state.go('main.posview');
	}

	$scope.goToVproc = function(){
		console.log("Switching to POS...");
		$scope.header = "Voucher Process";
		$state.go('main.vproc');
	}
	
});