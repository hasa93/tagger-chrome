angular.module('TaggerApp')
.controller('StatCtrl', function($scope, $filter, PosService, StatService){
	$scope.startDate = new Date();
	$scope.endDate = new Date();

	$scope.startDate.setDate($scope.endDate.getDate() - 7);

	$scope.prodData = [];
	$scope.products = [];
	$scope.productSearch = "";
	$scope.showResults = false;
	$scope.average = 0;
	$scope.peak = 0;
	$scope.sum = 0;
	$scope.items = 0;

	//Generates random data. Should remove from the final
	var generateDummyData = function(){
		$scope.prodData = [];

		for(var i = 0; i < 8; i++){
			$scope.prodData.push({ label: 'all', value: Math.floor(Math.random() * 5000 + 1)});
		}

		calculateAverage(5);
		getPeak();
	}

	var calculateAverage = function(unitPrice){
		$scope.items = $scope.prodData.length;
		$scope.sum = $scope.prodData.reduce(function(a, b){
			return a + b.value;
		}, 0);

		$scope.sum = $scope.sum * unitPrice;
		$scope.average = $scope.sum / Math.max($scope.items, 1);
		console.log("Avg: " + $scope.average);
		console.log("Sum: " + $scope.sum);
	}

	var getPeak = function(){
		$scope.peak = $scope.prodData.reduce(function(a, b){
			return Math.max(a, b.value);
		}, 0);
		console.log("Peak: " + $scope.peak);
	}

	$scope.updateData = function(prodId){
		$scope.showResults = false;

		if(prodId !== undefined){
			$scope.prodId = prodId;
		}

		if($scope.prodId === 'all'){
			StatService.getAllSalesStat($scope.startDate, $scope.endDate).then(function(response){
				console.log(response);
				if(response.length  <= 1){
					//$scope.prodData = [];
					generateDummyData();
					return;
				}

				$scope.prodData = [];

				response.map(function(item){
					$scope.prodData.push({ label: item.date, value: item.qty });
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
						$scope.prodData.push({ label: item.date, value: item.qty });
					});
				}
			});
		}
	}

	PosService.getProductList().then(function(res){
		console.log(res);
		$scope.products = res;
	});

	$scope.filterProducts = function(){
		if($scope.productSearch === "" || $scope.products.length == 0){
			console.log("Search Blank");
			$scope.showResults = false;
			return;
		}

		var len = $scope.productSearch.length;

		$scope.results = $scope.products.filter(function(elem, pos){
			var substr = elem.prod_name.toLowerCase().substring(0, len);
			if(substr === $scope.productSearch){
				return elem;
			}
		});
		$scope.showResults = true;
	}

	$scope.updateData('all');
});