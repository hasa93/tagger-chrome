angular.module('TaggerApp')
.controller('DashCtrl', function($scope, PosService){

	var getInventoryLevels = function(){
		PosService.getInventoryLevels().then(function(res){
			$scope.inventoryData = res;
		}, function(err){
			console.log(err);
		})
	}

	getInventoryLevels();
});