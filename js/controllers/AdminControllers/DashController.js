angular.module('TaggerApp')
.controller('DashCtrl', function($scope, PosService, MessengerService, config){

	MessengerService.receiveMessages(function(msg){
		console.log(msg);
	});

	MessengerService.requestUpdate();

	var getInventoryLevels = function(){
		PosService.getInventoryLevels().then(function(res){
			$scope.inventoryData = res;
		}, function(err){
			console.log(err);
		})
	}

	var getSalesData = function(){
		$scope.salesData = PosService.getSalesData();
	}

	getInventoryLevels();
	getSalesData();
});