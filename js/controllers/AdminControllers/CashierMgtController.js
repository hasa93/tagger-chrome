angular.module('TaggerApp')
.controller('CashierMgtCtrl', function($rootScope, $scope, $state, UserService){

	$scope.searchCashier = false;

	var searchType = "update";

	$scope.cashier = { name: '', type: 'csh' };
	$scope.validation = {};

	if($state.params.cashiers){
		$scope.searchResults = $state.params.cashiers;
		if($scope.searchResults.length == 1){
			$scope.cashier = $scope.searchResults[0];
			$scope.cashier.arrival = new Date($scope.cashier.arrival);
			$scope.delta = angular.copy($scope.cashier);
		}
		console.log($scope.searchResults);
	}

	$scope.goToSignUpView = function(){
		console.log('Switching to Cashier Sing Up View...');
		$state.go('admin.cashiersignupview');
	}

	$scope.searchCashiers = function(type){
		$scope.searchCashier = true;
		searchType = type;
	}

	$scope.selectCashier = function(searchIndex){
		$scope.cashier = $scope.searchResults[searchIndex];
		$scope.searchResults = [];
		$scope.cashier.arrival = new Date($scope.cashier.arrival);
		$scope.delta = angular.copy($scope.cashier);
		console.log($scope.cashier);
	}

	$scope.cancelSearch = function(){
		$scope.searchCashier = false;
	}

	$scope.confirmSearch = function(){
		$rootScope.isValid = true;
		console.log($scope.cashier.name);

		$rootScope.$broadcast('SUBMIT');

		UserService.getStaffByName($scope.cashier.name).then(function(response){
			if(response.length == 0 ) return;

			if(searchType === "update"){
				$state.go('admin.cashierupdateview', { cashiers: response });
			}
			else if(searchType === "delete"){
				$state.go('admin.cashierdeleteview', { cashiers: response });
			}

		}, function(err){
			console.log(err);
		});

	}

	$scope.createCashier = function(){
		console.log($scope.cashier);

		$rootScope.isValid = true;

		//validateCashierData();
		$rootScope.$broadcast('SUBMIT', {});

		console.log($rootScope.isValid);

		if($rootScope.isValid){
			UserService.createStaffMember($scope.cashier).then(function(res){
				$scope.cashier = { type: 'csh' };
				console.log(res);
			}, function(err){
				console.log(err);
			});
		}
	}

	$scope.updateCashier = function(){
		Object.keys($scope.delta).forEach(function(key, index){
			if($scope.delta[key] == '' && $scope.cashier[key] != ''){
				$scope.delta[key] = $scope.cashier[key];
			}
		});

		console.log($scope.delta);

		PosService.updateCahierById($scope.delta.id, $scope.delta).then(function(response){
			console.log(response);
		}, function(err){
			console.log(err);
		})
	}

});