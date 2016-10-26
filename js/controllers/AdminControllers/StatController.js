angular.module('TaggerApp')
.controller('StatCtrl', function($scope, PosService, StatService){
	$scope.startDate = new Date();
	$scope.endDate = new Date();
	$scope.prodId = 'all';

	$scope.startDate.setDate($scope.endDate.getDate() - 7);

	$scope.products = [
		{ name: "Cateloop" },
		{ name: "Onion" },
		{ name: "Orion" }
	];

	$scope.prodData = [
		{ label: 'all', value: 2000 },
		{ label: 'all', value: 567 },
		{ label: 'all', value: 1453 },
		{ label: 'all', value: 400 },
		{ label: 'all', value: 1998 },
		{ label: 'all', value: 3452 },
		{ label: 'all', value: 1456 },
		{ label: 'all', value: 6434 },
		{ label: 'all', value: 786 },
		{ label: 'all', value: 2356 },
		{ label: 'all', value: 700 }
	];

	$scope.updateData = function(prodId){
		if(prodId !== undefined){
			$scope.prodId = prodId;
		}

		if($scope.prodId === 'all'){
			StatService.getAllSalesStat($scope.startDate, $scope.endDate).then(function(response){
				console.log($scope.startDate);
				console.log($scope.endDate);
				console.log(response);

				$scope.prodData = [];

				response.map(function(item){
					$scope.prodData.push({ label: item.date, value: item.qty });
				});

				console.log($scope.prodData);
			});
		}
		else{
			StatService.getAllSalesStat($scope.startDate, $scope.endDate, $scope.prodId).then(function(response){
				console.log(response);
			});
		}

		$scope.max = $scope.prodData.reduce(function(a, b){
			if(a.qty < b.qty){
				return b;
			}
			else{
				return a;
			}
		});

		console.log($scope.max);
	}

	PosService.getProductList().then(function(res){
		console.log(res);
		$scope.products = res;
	});

	$scope.updateData('all');
});