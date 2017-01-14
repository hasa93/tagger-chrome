angular.module('TaggerApp')
.controller('StatCtrl', function($scope, $filter, $timeout, PosService, StatService){
	$scope.startDate = new Date();
	$scope.endDate = new Date();

	$scope.startDate.setDate($scope.endDate.getDate() - 7);
	$scope.showInvalidDates = false;

	$scope.prodData = [];
	$scope.products = [];
	$scope.productSearch = "";
	$scope.showResults = false;
	$scope.average = 0;
	$scope.peak = 0;
	$scope.sum = 0;
	$scope.items = 0;

	var calculateAverage = function(){
		$scope.items = $scope.prodData.length;
		$scope.sum = $scope.prodData.reduce(function(a, b){
			return a + b.total;
		}, 0);

		var days = ($scope.endDate - $scope.startDate) / 8.64e+7;
		$scope.average = $scope.sum / days;
		console.log("Avg: " + $scope.average);
		console.log("Sum: " + $scope.sum);
	}

	var getPeak = function(){
		$scope.peak = $scope.prodData.reduce(function(a, b){
			return Math.max(a, b.total);
		}, 0);
		console.log("Peak: " + $scope.peak);
	}

	$scope.updateData = function(prodId){
		$scope.showResults = false;

		if($scope.startDate.getTime() > $scope.endDate.getTime()){
			$scope.showInvalidDates = true;
			$timeout(function(){
				$scope.showInvalidDates = false
			}, 2500);
		}

		if(prodId !== undefined){
			$scope.prodId = prodId;
		}

		if($scope.prodId === 'all'){
			StatService.getAllSalesStat($scope.startDate, $scope.endDate).then(function(response){
				console.log(response);
				if(response.length  <= 1){
					$scope.prodData = [];
					return;
				}

				$scope.prodData = [];

				response.map(function(item){
					$scope.prodData.push({ label: item.date.split('T')[0], value: item.qty, total: item.total });
				});

				calculateAverage(5);
				getPeak();
				console.log($scope.prodData);
			});
		}
		else{
			console.log(prodId);
			prodId = $scope.results[prodId].prod_id;
			StatService.getSalesById($scope.startDate, $scope.endDate, prodId).then(function(response){
				console.log(response);

				if(response.length > 1){
					$scope.prodData = [];

					response.map(function(item){
						$scope.prodData.push({ label: item.date.split('T')[0], value: item.qty, total: item.total });
					});
				}
			});
		}
	}

	$scope.filterProducts = function(){

		if($scope.productSearch === ""){
			console.log("Search Blank");
			$scope.showResults = false;
			return;
		}

		if($scope.products.length == 0){
			console.log("Listing all products...");
			PosService.getProductList().then(function(res){
				console.log(res);
				$scope.products = res;
			});
		}
		else{
			var len = $scope.productSearch.length;

			$scope.results = $scope.products.filter(function(elem, pos){
				var substr = elem.name.toLowerCase().substring(0, len);
				if(substr === $scope.productSearch.toLowerCase()){
					return elem;
				}
			});

			$scope.showResults = true;
		}
	}

	$scope.closeNotification = function(){
		$scope.showInvalidDates = false;
	}

	$scope.updateData('all');
});