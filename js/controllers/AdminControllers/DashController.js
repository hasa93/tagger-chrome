angular.module('TaggerApp')
.controller('DashCtrl', function($scope, PosService, config){
	var socket = io.connect(config.locals.apiUrl);

	socket.on('hello', function(message){
		console.log(message.text);
	})

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