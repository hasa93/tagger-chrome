angular.module('TaggerApp')
.directive('chartWindow', function(PosService){

	var linkFn = function(scope, elem, attr){
		console.log("Running link on chart...");

		scope.maxLevel = 0;
		scope.levels = [];

		var getInventoryLevels = function(){
			PosService.getInventoryLevels().then(function(levels){
				console.log(levels);
				scope.levels = levels;

				for(var i = 0; i < levels.length; i++){
					if(levels[i].prod_level > scope.maxLevel){
						scope.maxLevel = levels[i].prod_level;
					}
				}

				if(scope.type === 'bar'){
					convertDataToBars();
				}

			}, function(err){
				console.log(err);
			});
		}

		var convertDataToPoints = function(){

		}

		var convertDataToBars = function(){
			scope.levels = scope.levels.map(function(item, index, array){

				var bar = item;

				bar["coords"] = {};
				bar["label"] = {};

				//x coordinate on chart. Hard coded for now
				bar["coords"]["x"] = 3;

				//y coordinate on chart. 20 and 2.2 are hardcoded offset values. This
				//should be a percentage value
				bar["coords"]["y"] = (index + 1) * 20 + 2.2;

				//bar height from inventory level. Maximum height in assumed to be 90%
				bar["height"] = item.prod_level * 90 / (scope.maxLevel + 1);

				//coordinates for the label. Same assumptions as before.
				bar["label"]["x"] = 3;
				bar["label"]["y"] = (index + 1) * 20;

				return bar;
			})
		}

		getInventoryLevels();
	}

	return{
		restrict: 'E',
		link: linkFn,
		transclude: true,
		scope: {
			width: '@',
			height: '@',
			type: '@'
		},
		templateUrl: function(elem, attr){
			if(attr.type === 'bar'){
				return 'templates/barchart.html';
			}

			if(attr.type === 'line'){
				return 'templates/linechart.html'
			}
		}
	}
});