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
		console.log("Switching to Voucher view...");
		$scope.header = "Voucher Process";
		$state.go('main.voucherview');
	}

	$scope.goToRproc = function(){
		console.log("Switching to Return view...");
		$scope.header = "Return Process";
		$state.go('main.returnview');
	}
	
});