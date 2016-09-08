angular.module('TaggerApp')
.controller('DashCtrl', function($scope, PosService){

	var socket = io.connect('http://localhost:3000');

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