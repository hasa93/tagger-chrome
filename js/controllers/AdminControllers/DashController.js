angular.module('TaggerApp')
.controller('DashCtrl', function($scope, PosService){
	var socket = io.connect('http://ec2-54-218-53-126.us-west-2.compute.amazonaws.com:3000');

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