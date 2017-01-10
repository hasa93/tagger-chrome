angular.module('TaggerApp')
.controller('CashierMgtCtrl', function($rootScope, $scope, $state, $timeout, UserService){

	$scope.searchCashier = false;
	$scope.showMismatch = false;
	$scope.showCreation = false;
	$scope.showExists = false;

	var searchType = "update";

	$scope.cashier = { name: '', type: 'csh', passwd: '' };
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

	$scope.closeNotification = function(message){
		$scope.showMismatch = false;
		$scope.showCreation = false;
		$scope.showExists = false;
	}

	$scope.promptNotification = function(type, message, timeout){
		console.log("Notification");

		$scope.showNotification = true;
		$scope.notification.type = type;
		$scope.notification.message = message;

		if(timeout){
			$timeout(function(){
				$scope.showNotification = false
			}, timeout);
		}
	}

	$scope.selectCashier = function(searchIndex){
		$scope.cashier = $scope.searchResults[searchIndex];
		$scope.searchResults = [];
		$scope.cashier.arrival = new Date($scope.cashier.arrival);
		$scope.delta = angular.copy($scope.cashier);
		console.log($scope.cashier);
		if(action == 'delete'){
			$scope.promptNotification('error', 'Are you sure?');
		}
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
		
		if($scope.cashier.confirmpw != $scope.cashier.passwd){
			$scope.showMismatch = true;
			$timeout(function(){
				$scope.showMismatch = false;
			}, 4000);
			return;
		}
		
		UserService.createStaffMember($scope.cashier).then(function(res){
			if(res.status === 'FAILED'){
				$scope.promptNotification('error', 'Failed to create cashier', 3000);
			}
			else{
				$scope.promptNotification('success', 'cashier created successfully', 3000);
			}
		})


		//validateCashierData();
		$rootScope.$broadcast('SUBMIT', {});

		console.log($rootScope.isValid);

		if($rootScope.isValid){
			UserService.createStaffMember($scope.cashier).then(function(res){
				$scope.cashier = { type: 'csh' };

				if(res.message === 'User Exists'){
					$scope.showExists = true;
				}
				else{
					$scope.showCreation = true;
				}

				$timeout(function(){
					$scope.showCreation = false;
				}, 4000);

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