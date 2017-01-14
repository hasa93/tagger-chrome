angular.module('TaggerApp')
.controller('DashCtrl', function($scope, PosService, MessengerService, StatService, config){

	MessengerService.receiveMessages(function(msg){
		console.log(msg);
	});

	MessengerService.requestUpdate();

	$scope.startDate = new Date();
	$scope.endDate = new Date();

	$scope.startDate.setDate($scope.endDate.getDate() - 7);

	var getInventoryLevels = function(){

		StatService.getFavorites().then(function(result){
			if(result.length == 0){
				return;
			}

			$scope.favData = [];

			result.map(function(item){
				$scope.favData.push({ label: item.name.substring(0, 20), value: item.qty });
			});
			console.log($scope.favData);
		});
	}

	var getSalesData = function(){
		StatService.getAllSalesStat($scope.startDate, $scope.endDate).then(function(response){
			console.log(response);
			if(response.length  <= 1){
				$scope.prodData = [];
				return;
			}
			$scope.prodData = [];

			response.map(function(item){
				$scope.prodData.push({ label: item.date.split('T')[0], value: item.qty });
			});
			console.log($scope.prodData);
		});
	}

	getInventoryLevels();
	getSalesData();
});