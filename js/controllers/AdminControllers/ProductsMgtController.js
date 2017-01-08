angular.module('TaggerApp')
.controller('ProductsMgtCtrl', function($scope, $rootScope, $state, $timeout, PosService){

	var searchType = "";
	var currDate = new Date();

	$scope.showSearch = false;
	$scope.showNotification = false;

	$scope.notification = {
		type: 'success',
		message: 'hola!'
	}

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

	$scope.closeNotification = function(message){
		console.log(message);
		$scope.showNotification = false;
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

	$scope.goToCreateProductsView = function(){
		$state.go('admin.createproductsview');
	}

	$scope.searchProducts = function(action){
		$scope.showSearch = true;
		searchType = action;
	}

	$scope.selectProduct = function(prodIndex, action){
		$scope.product = $scope.searchResults[prodIndex];
		$scope.product.arrival = new Date($scope.product.arrival);
		$scope.delta = angular.copy($scope.product);

		if(action == 'delete'){
			$scope.promptNotification('error', 'Are you sure?');
		}
	}

	$scope.cancelSearch = function(){
		$scope.showSearch = false;
	}

	$scope.confirmSearch = function(){
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
				$state.go('admin.updatestockview', { products: response });
			}
		}, function(err){
			console.log(err);
		});
	}

	$scope.createProduct = function(){
		$rootScope.isValid = true;
		$rootScope.$broadcast('SUBMIT');

		var formData = new FormData();

		formData.append('thumb', $scope.fileHolder);
		formData.append('product', JSON.stringify($scope.product));

		console.log(formData);
		console.log($scope.fileHolder);

		if($rootScope.isValid){
			PosService.insertProduct(formData).then(function(res){
				$scope.product = {};
				console.log(res);
			}, function(err){
				console.log(err);
			});
		}

		console.log($scope.product);
	}

	$scope.updateProduct = function(){
		Object.keys($scope.delta).forEach(function(key, index){
			if($scope.delta[key] == '' && $scope.product[key] != ''){
				$scope.delta[key] = $scope.product[key];
			}
		});

		console.log($scope.fileHolder);

		var formData = new FormData();

		formData.append('thumb', $scope.fileHolder);
		formData.append('product', JSON.stringify($scope.delta));

		PosService.updateProductById($scope.delta.id, formData).then(function(response){
			console.log(response);
			if(response.status === 'FAILED'){
				$scope.promptNotification('error', 'Update Failed', 2000);
			}
			else{
				$scope.promptNotification('success', 'Update Success', 2000);
			}
		}, function(err){
			console.log(err);
		})
	}

	$scope.deleteProduct = function(){
		$scope.closeNotification();

		o.deleteProductById($scope.product.id).then(function(response){
			if(response.status === 'FAILED'){
				$scope.promptNotification('error', 'Could not delete', 3000);
			}
			else{
				$scope.promptNotification('success', 'Product Removed', 3000);
			}
		})
	}

	$scope.uploadImage = function(){
		document.querySelector('#prodimage').click();
	}

	$scope.updateStock = function(){
		
	}
});