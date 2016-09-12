angular.module('TaggerApp')
.controller('PosCtrl', function($scope, $rootScope, $timeout, PosService, ReaderService, RetailService, config){
	console.log('In PosCtrl...');

	$scope.query = { prodId: '' };
	$scope.products = [];
	$scope.total = 0;
	$scope.successNotification = false;

	ReaderService.getAvailableDevices().then(function(devs){
		ReaderService.connectReader(devs[0].path);
		$rootScope.readerDisconnected = false;
	}, function(err){
		console.log("No devices found!");
	});

	$rootScope.$on('TAGS_DETECTED', function(event, data){
		console.log(data.tags);

		for(var i = 0; i < data.tags.length; i++){
			PosService.getProductByTag(data.tags[i]).then(function(response){
				$scope.insertProductById(response.prodId);
			})
		}
	});

	var inProductList = function(product){
		for(var i = 0; i < $scope.products.length; i++){
			var id = product.id;

			if(id === $scope.products[i].id){
				$scope.products[i].qty += 1;
				$scope.total += product.price;
				return true;
			}
		}

		return false;
	}

	var insertProduct = function(product){
		if(!inProductList(product) && product !== undefined){
				$scope.products.push(product);
				$scope.total += product.price;
			}
		console.log($scope.products);
	}

	$scope.insertProductById = function(id){
		var prodId = id || $scope.query.prodId;
		console.log(prodId);

		$rootScope.isValid = true;

		$rootScope.$broadcast('SUBMIT');

		if($rootScope.isValid){
			PosService.getProductById(prodId).then(function(product){
				product.qty = 1;
				insertProduct(product);
			}, function(err){
				console.log(err);
			});
		}
	}

	$scope.createInvoice = function(){
		var ticket = {};

		ticket.branchId = config.locals.branchId;
		ticket.total = $scope.total;
		ticket.products = $scope.products;

		RetailService.createInvoice(ticket).then(function(response){
			$scope.successNotification = true;
			$timeout(function(){
				$scope.successNotification = false;
			}, 4000);
			$scope.products = [];

			console.log(response);
		}, function(err){
			console.log(err);
		})
	}

	$scope.dropQuantity = function(id){
		for(var i = 0; i < $scope.products.length; i++){
			if($scope.products[i].id == id){
				$scope.products[i].qty -= 1;
				$scope.total -= products[i].price;
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

	$scope.closeNotification = function(){
		$scope.successNotification = false;
	}

});