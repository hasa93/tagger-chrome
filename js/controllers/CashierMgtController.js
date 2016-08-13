angular.module('TaggerApp')
.controller('CashierMgtCtrl', function($scope, $state){
	
	$scope.goToSignUpView = function(){
		console.log('Switching to Cashier Sing Up View...');
		$state.go('admin.cashiersignupview');
	}
});