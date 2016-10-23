angular.module('TaggerApp')
.controller('StatCtrl', function($scope, PosService){
	var today = new Date();
	var nextDay = new Date();
	nextDay.setDate(nextDay.getDate() + 7);
	console.log(nextDay);

	$scope.startDate = today;
	$scope.endDate = nextDay;

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

	$scope.getData = function(prodId){
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

	$scope.getData('all');
});