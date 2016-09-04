angular.module('TaggerApp')
.controller('ProductsMgtCtrl', function($scope, $rootScope, $state, PosService){

	var searchType = "";
	var currDate = new Date();

	if($state.params.products){
		$scope.results = $state.params.products;
	}

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

	$scope.selectProduct = function(prodId){
		PosService.getProductById(prodId).then(function(response){
			$scope.product = response;
			$scope.product.arrival = new Date($scope.product.arrival);
			$scope.results = [response];
			console.log($scope.product);
		})
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
			if(searchType === 'deleteProduct'){
				$state.go('admin.deleteproductsview');
			}
			else if(searchType === 'updateProduct'){
				$state.go('admin.updateproductsview', { products: response.data });
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