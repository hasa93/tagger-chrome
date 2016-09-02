angular.module('TaggerApp')
.controller('ProductsMgtCtrl', function($scope, $rootScope, $state, PosService){

	var searchType = "";
	var currDate = new Date();

	console.log(currDate);

	$scope.showSearch = false;

	$scope.product = {
		arrival: currDate,
		age: 'ANY'
	};

	$scope.goToCreateProductsView = function(){
		$state.go('admin.createproductsview');
	}

	$scope.searchProducts = function(action){
		$scope.showSearch = true;
		searchType = action;
	}

	$scope.cancelSearch = function(){
		$scope.showSearch = false;
	}

	$scope.confirmSearch = function(){
		if(searchType === 'deleteProduct'){
			$state.go('admin.deleteproductsview');
		}
		else if(searchType === 'updateProduct'){
			$state.go('admin.updateproductsview');
		}
		else if(searchType === 'updateStock'){
			$state.go('admin.updatestockview')
		}
	}

	$scope.createProduct = function(){
		$scope.validation = {};
		$rootScope.isValid = true;

		if(!$scope.product.name || $scope.product.name === ''){
			$rootScope.isValid = false;
			$scope.validation.name = "Required";
		}

		if(!$scope.product.price || $scope.product.price === ''){
			$rootScope.isValid = false;
			$scope.validation.price = "Required";
		}

		if($scope.product.price && isFinite($scope.product.price)){
			$rootScope.isValid = false;
			$scope.validation.price = "Price must be a number";
		}

		if($rootScope.isValid){
			PosService.insertProduct($scope.product).then(function(res){
				$scope.product = {};
				console.log(res);
			}, function(err){
				console.log(err);
			})
		}

		console.log($scope.product);
	}
});