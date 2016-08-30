angular.module('TaggerApp')
.controller('ChartCtrl', function($scope, PosService){
	$scope.data = {};

	var getInventoryData = function(){
		PosService.getInventoryLevels().then(function(levels){
			$scope.data.inventoryLevels = {};
			$scope.data.inventoryLevels.data = levels;
			$scope.data.inventoryLevels.max = 0;

			for(var i = 0; i < levels.length; i++){
				if($scope.data.inventoryLevels.max < levels[i].prod_level){
					$scope.data.inventoryLevels.max = levels[i].prod_level;
				}
			}
		});
	}

	getInventoryData();
});