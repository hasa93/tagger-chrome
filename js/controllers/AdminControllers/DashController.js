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
		PosService.getInventoryLevels().then(function(res){
			$scope.inventoryData = res;
		}, function(err){
			console.log(err);
		})
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