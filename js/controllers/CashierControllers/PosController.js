angular.module('TaggerApp')
.controller('PosCtrl', function($scope, $rootScope, $timeout, PosService, ReaderService, RetailService, config){
	console.log('In PosCtrl...');

	$scope.query = { prodId: '', cashAmount: '' };

	$scope.products = RetailService.getInvoiceList();
	$scope.total = RetailService.getInvoiceTotal();
	$scope.voucherAmount = RetailService.getVoucherAmount();
	$scope.totalItems = 0;

	$scope.failureNotification = false;
	$scope.showInsertDialog = false;
	$scope.showConfirmDialog = false;

	$scope.errorTitle = "";

	$scope.connectReader = function(){
		ReaderService.getAvailableDevices().then(function(devs){
			ReaderService.connectReader(devs[0].path);
			$rootScope.readerDisconnected = false;
		}, function(err){
			console.log("No devices found!");
		});
	}

	$scope.connectReader();

	var resetInvoice = function(){
		$scope.products = [];
		$scope.total = 0;
		$scope.voucherAmount = 0;
		$scope.totalItems = 0;

		RetailService.resetInvoice();
	}

	var refreshInvoice = function(){
		$scope.products = RetailService.getInvoiceList();
		$scope.total = RetailService.getInvoiceTotal();
		$scope.totalItems = RetailService.getNumberOfItems();
	}

	var insertAndUpdate = function(product){
		RetailService.insertProduct(product);

		$scope.products = RetailService.getInvoiceList();
		$scope.totalItems = $scope.products.reduce(function(a, b){
			console.log(b);
			return a + b.qty;
		}, 0);
		$scope.total = RetailService.getInvoiceTotal();
	}

	$rootScope.$on('TAGS_DETECTED', function(event, data){
		console.log(data.tags);
		RetailService.resetInvoice();

		for(var i = 0; i < data.tags.length; i++){
			PosService.getProductByTag(data.tags[i]).then(function(response){
				console.log(response);
				insertAndUpdate(response);
			})
		}
		console.log($scope.products);
	});

	$scope.insertProductById = function(id){
		var prodId = id || $scope.query.prodId;
		console.log(prodId);

		$rootScope.isValid = true;

		$rootScope.$broadcast('SUBMIT');

		if($rootScope.isValid){
			PosService.getProductById(prodId).then(function(product){
				product.qty = 1;
				insertAndUpdate(product);
				$scope.showInsertDialog = false;
			}, function(err){
				console.log(err);
			});
		}
	}

	$scope.createInvoice = function(){
		var ticket = {};

		ticket.branchId = config.locals.branchId;
		ticket.products = $scope.products;

		if($scope.total > 0){
			ticket.total = $scope.total;
		}

		if($scope.voucherAmount > 0){
			ticket.voucherAmount = $scope.voucherAmount;
		}

		RetailService.createInvoice(ticket).then(function(response){
			$scope.successNotification = true;
			$timeout(function(){
				$scope.successNotification = false;
			}, 4000);

			resetInvoice();
			console.log(response);
		}, function(err){
			console.log(err);
		})
	}

	$scope.showAddProductDialog = function(){
		console.log("Show add product");
		$scope.showInsertDialog = true;
	}


	$scope.hideDialogs = function(){
		$scope.showInsertDialog = false;
		$scope.showConfirmDialog = false;
	}

	$scope.showConfirmPurchaseDialog = function(){
		$scope.showConfirmDialog = true;
	}

	$scope.dropQuantity = function(index){
		RetailService.dropQuantity(index);
		refreshInvoice();
	}

	$scope.incrementQuantity = function(index){
		RetailService.insertProduct($scope.products[index]);
		refreshInvoice();
	}

	$scope.removeProduct = function(index){
		RetailService.removeProduct(index);
		refreshInvoice();
	}

	$scope.closeNotification = function(){
		$scope.failureNotification = false;
		$scope.query = { prodId: '', cashAmount: '' };
	}

	$scope.confirmPurchase = function(){
		console.log($scope.query.cashAmount);
		var cash = parseInt($scope.query.cashAmount);

		if($scope.totalItems == 0){
			$scope.hideDialogs();
			$scope.failureNotification = true;
			$scope.errorTitle = "Invoice is empty";
		}
		else if(!isFinite($scope.query.cashAmount) || cash < 0){
			$scope.hideDialogs();
			$scope.failureNotification = true;
			$scope.errorTitle = "Invalid cash value";
		}
		else if(cash < $scope.total){
			var cash = parseInt($scope.query.cashAmount);
			$scope.hideDialogs();
			$scope.failureNotification = true;
			$scope.errorTitle = "Not enough cash";
		}

		$timeout(function(){
			$scope.failureNotification = false;
			$scope.errorTitle = "";
			$scope.query = { prodId: '', cashAmount: '' };
		}, 4000);
	}

});