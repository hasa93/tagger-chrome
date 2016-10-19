angular.module('TaggerApp')
.controller('StatCtrl', function($scope){
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
		{ label: 'all', value: 1998 }
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

	$scope.getData('all');
});