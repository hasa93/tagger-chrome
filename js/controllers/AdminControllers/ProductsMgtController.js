angular.module('TaggerApp')
.controller('ProductsMgtCtrl', function($scope, $rootScope, $state, PosService){

	var searchType = "";
	var currDate = new Date();

	$scope.showSearch = false;

	$scope.product = {
		arrival: currDate,
		age: 'ANY'
	};

	if($state.params.products){
		$scope.searchResults = $state.params.products;
		if($scope.searchResults.length == 1){
			$scope.product = $scope.searchResults[0];
			$scope.product.arrival = new Date($scope.product.arrival);
			$scope.delta = angular.copy($scope.product);
		}
	}

	$scope.goToCreateProductsView = function(){
		$state.go('admin.createproductsview');
	}

	$scope.searchProducts = function(action){
		$scope.showSearch = true;
		searchType = action;
	}

	$scope.selectProduct = function(prodIndex){
		$scope.product = $scope.searchResults[prodIndex];
		$scope.product.arrival = new Date($scope.product.arrival);
		$scope.delta = angular.copy($scope.product);
		$scope.searchResults = [];
	}

	$scope.cancelSearch = function(){
		$scope.validation = {};
		$rootScope.isValid = true;
		$scope.showSearch = false;
	}

	$scope.confirmSearch = function(){
		$scope.validation = {};

		if(!$scope.product.query || $scope.product.query === ''){
			$rootScope.isValid = false;
			$scope.validation.search = "Required";
			return;
		}

		PosService.getProductsByName($scope.product.query).then(function(response){
			console.log(response);

			if(response.length == 0) return;

			if(searchType === 'deleteProduct'){
				$state.go('admin.deleteproductsview', { products: response });
			}
			else if(searchType === 'updateProduct'){
				$state.go('admin.updateproductsview', { products: response });
			}
			else if(searchType === 'updateStock'){
				$state.go('admin.updatestockview');
			}
		}, function(err){
			console.log(err);
		});
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

		if($scope.product.price && !isFinite($scope.product.price)){
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

	$scope.updateProduct = function(){
		Object.keys($scope.delta).forEach(function(key, index){
			if($scope.delta[key] == '' && $scope.product[key] != ''){
				$scope.delta[key] = $scope.product[key];
			}
		});

		console.log($scope.delta);

		PosService.updateProductById($scope.delta.id, $scope.delta).then(function(response){
			console.log(response);
		}, function(err){
			console.log(err);
		})
	}

});