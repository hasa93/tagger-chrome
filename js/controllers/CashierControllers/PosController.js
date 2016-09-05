angular.module('TaggerApp')
.controller('PosCtrl', function($scope, $rootScope, $http, PosService){
	console.log('In PosCtrl...');

	$scope.showDialog = false;
	$rootScope.readerDisconnected = false;

	$scope.query = { prodId: '' };

	$scope.products = [];

	var uid = '';

	var reader = new serialListener('/dev/ttyACM0');

	reader.init();

	reader.attachErrorListener(function(err){
		$rootScope.readerDisconnected = true;
	});

	reader.attachReadCb(function(stream){
		var data = new Uint8Array(stream.data);
		var dataStr = data.reduce(function(str, chrCode){
			return str += String.fromCharCode(chrCode);
		}, '');

		uid += dataStr;

		if(uid.length > 7){

			var reqUrl = 'http://localhost:3000/product/uid/' + uid;
			uid = "";
			console.log(reqUrl);

			$http.get(reqUrl).then(function(data, err){
				if(err) console.log(err);
				var prod = data.data[0];
				prod.qty = 1;
				insertProduct(prod);
			});
		}
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