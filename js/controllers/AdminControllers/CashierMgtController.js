angular.module('TaggerApp')
.controller('CashierMgtCtrl', function($scope, $state, UserService){
	
	$scope.searchCashier = false;

	var searchType = "update";

	$scope.cashier = { type: 'csh' };

	$scope.goToSignUpView = function(){
		console.log('Switching to Cashier Sing Up View...');
		$state.go('admin.cashiersignupview');
	}

	$scope.searchCashiers = function(type){
		$scope.searchCashier = true;
		searchType = type;
	}

	$scope.cancelSearch = function(){
		$scope.searchCashier = false;
	}

	$scope.confirmSearch = function(){
		if(searchType === "update"){
			$state.go('admin.cashierupdateview');
		}
		else if(searchType === "delete"){
			$state.go('admin.cashierdeleteview');
		}
	}

	$scope.createCashier = function(){
		console.log($scope.cashier);

		UserService.createStaffMember($scope.cashier).then(function(res){
			console.log(res);
		}, function(err){
			console.log(err);
		});
	}

});