angular.module('TaggerApp')
.controller('PosCtrl', function($scope, $rootScope, PosService, ReaderService){
	console.log('In PosCtrl...');

	$scope.query = { prodId: '' };
	$scope.products = [];

	ReaderService.getAvailableDevices().then(function(devs){
		ReaderService.connectReader(devs[0].path);
		$rootScope.readerDisconnected = false;
	}, function(err){
		console.log("No devices found!");
	});

	$rootScope.$on('TAGS_DETECTED', function(event, data){
		console.log(data);
		$scope.tags = data.tags;
	});

	var inProductList = function(product){
		for(var i = 0; i < $scope.products.length; i++){
			var id = product.id;

			if(id === $scope.products[i].id){
				$scope.products[i].qty += 1;
				return true;
			}
		}

		return false;
	}

	var insertProduct = function(product){
		if(!inProductList(product) && product !== undefined){
				$scope.products.push(product);
			}
		console.log($scope.products);
	}

	$scope.insertProductById = function(){
		console.log($scope.query);
		PosService.getProductById($scope.query.prodId).then(function(product){
			product.qty = 1;
			console.log(product);
			insertProduct(product);
		}, function(err){
			console.log(err);
		});
	}

	$scope.recordPurchase = function(){
		$http.post('http://localhost:3000/insert/purchase', {
			products: $scope.products
		}).then(function(err, data){
			if(err) console.log(err);
			console.log(data);
		});
	}

	$scope.dropQuantity = function(id){
		for(var i = 0; i < $scope.products.length; i++){
			if($scope.products[i].id == id){
				$scope.products[i].qty -= 1;
				break;
			}
		}
	}

	$scope.removeProduct = function(id){
		console.log(id);

		for(var i = 0; i < $scope.products.length; i++){
			if($scope.products[i].id == id){
				$scope.products.splice(i, 1);
				console.log($scope.products);
				break;
			}
		}
	}

});