angular.module('TaggerApp')
.controller('CashierMgtCtrl', function($rootScope, $scope, $state, UserService){

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

	var validateCashierData = function(){
		$scope.validation = {};
		$rootScope.isValid = true;

		console.log($scope.cashier);
		console.log($scope.validation);

		if(!$scope.cashier.uname || $scope.cashier.uname === ''){
			$rootScope.isValid = false;
			$scope.validation.uname = 'Required Field';
		}

		if(!$scope.cashier.passwd || $scope.cashier.passwd === ''){
			$rootScope.isValid = false;
			$scope.validation.passwd = 'Required Field';
		}
		else if($scope.cashier.passwd.length < 8){
			$rootScope.isValid = false;
			$scope.validation.passwd = "Password must be at least 8 characters";
		}

		if(!$scope.cashier.lname || $scope.cashier.lname === ''){
			$rootScope.isValid = false;
			$scope.validation.lname = 'Required Field';
		}

		if(!$scope.cashier.fname || $scope.cashier.fname === ''){
			$rootScope.isValid = false;
			$scope.validation.fname = 'Required Field';
		}


		//Additional logic for password and user validation is required
	}

	$scope.createCashier = function(){
		console.log($scope.cashier);

		validateCashierData();

		if($rootScope.isValid){
			UserService.createStaffMember($scope.cashier).then(function(res){
				$scope.cashier = { type: 'csh' };
				console.log(res);
			}, function(err){
				console.log(err);
			});
		}
	}

});