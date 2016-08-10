angular.module('TaggerApp')
.directive('chartWindow', function(PosService){
	
	var linkFn = function(scope, elem, attr){
		console.log("In chart...");
		console.log(scope.width);
		console.log(scope.height);

		scope.data = [];
		scope.maxLevel = 0;

		PosService.getInventoryLevels(function(resData){
			scope.data = resData;
			
			for(var i = 0; i < scope.data.length; i++){
				if(scope.data[i].prod_level > scope.maxLevel){
					scope.maxLevel = scope.data[i].prod_level;
				}
			}
		});
	}

	return{
		restrict: 'E',
		link: linkFn,
		scope: {
			width: '@',
			height: '@',
			type: '@'
		},
		templateUrl: 'templates/bargraph.html'
	}
});