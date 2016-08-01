angular.module('TaggerApp', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/login");

	$stateProvider
	.state('main', {
		url: '/main',
		views:{
			'': { 
					templateUrl: '/templates/mainview.html',
					controller: 'MainCtrl'
				}
		// 'cashier@main': { 
		// 		templateUrl: '/templates/postable.html' 
		// 	}
		}
	})
	.state('main.posview', {
		templateUrl: '/templates/postable.html',
		controller: 'PosCtrl'
	})
	.state('login',{
		url: '/login',
		templateUrl: '../login.html',
		controller:'LoginCtrl'
	});
})
.controller('MainCtrl', function($scope, $state){
	console.log("In MainCtrl...");

	$scope.header = "Home";	

	$scope.goToPos = function(){
		console.log("Switching to POS...");
		$scope.header = "POS View";
		$state.go('main.posview');
	}

	$scope.goToVproc = function(){
		console.log("Switching to POS...");
		$scope.header = "Voucher Process";
		$state.go('main.vproc');
	}
	
})
.controller('PosCtrl', function($scope, $http){
	console.log('In PosCtrl...');

	$scope.showDialog = false;
	$scope.readerDisconnected = false;

	$scope.query = { prodId: '' };

	$scope.products = [];

	var uid = '';

	var reader = new serialListener('/dev/ttyACM0');

	reader.init();

	reader.attachErrorListener(function(err){
		$scope.readerDisconnected = true;
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
			var id = product.prod_id;

			if(id === $scope.products[i].prod_id){
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

	$scope.toggleDialog = function(){
		$scope.showDialog = !$scope.showDialog;
	}

	$scope.searchItemId = function(){
		console.log($scope.query);

		var url = 'http://localhost:3000/product/' + $scope.query.prodId;

		$http.get(url).then(function(data, err){
			if(err) console.log(error);

			var prod = data.data[0];
			prod.qty = 1;

			insertProduct(prod);

			$scope.showDialog = !$scope.showDialog;
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
	
});
