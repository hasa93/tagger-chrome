angular.module('TaggerApp')
.directive('chartWindow', function(PosService){

	var linkFn = function(scope, elem, attr){
		console.log("Running link on chart...");

		scope.maxLevel = 0;

		if(scope.lineColor == undefined || scope.lineColor == ''){
			scope.lineColor = '#fff';
		}

		scope.$watch('data', function(newVal, oldVal){

			if(scope.data){
				for(var i = 0; i < scope.data.length; i++){
					if(scope.data[i].value > scope.maxLevel){
						scope.maxLevel = scope.data[i].value;
					}
				}

				if(scope.type === 'bar'){
					convertDataToBars();
				}
				else if(scope.type === 'line'){
					convertDataToPoints();
				}
			}
		});

		var convertDataToPoints = function(){
			var x = 3; //An arbitrary starting point for x
			var deltaX = parseInt((scope.width - 2 * x) / (scope.data.length - 1));

			scope.points = "";
			scope.markers = [];

			for(var i = 0; i < scope.data.length; i++){
				var y = scope.data[i].value;
				y = parseInt(80 - (y / scope.maxLevel * 80));

				scope.points += String(x) + ',' + String(y) + ' ';

				scope.markers.push({
					coords:{
						x: x,
						y: y
					},
					label: scope.data[i].label + ' (' + scope.data[i].value + ')'
				})

				x += deltaX;
			}

			console.log(scope.markers);
		}

		var convertDataToBars = function(){
			scope.bars = scope.data.map(function(item, index, array){

				var bar = item;

				var text = bar.label;

				bar["coords"] = {};
				bar["label"] = { text: text };

				//x coordinate on chart. Hard coded for now
				bar["coords"]["x"] = 3;

				//y coordinate on chart. 20 and 2.2 are hardcoded offset values. This
				//should be a percentage value
				bar["coords"]["y"] = (index + 1) * 20 + 2.2;

				//bar height from inventory level. Maximum height in assumed to be 90%
				bar["height"] = item.value * 90 / (scope.maxLevel + 1);

				//coordinates for the label. Same assumptions as before.
				bar["label"]["x"] = 3;
				bar["label"]["y"] = (index + 1) * 20;

				return bar;
			})
		}
	}

	return{
		restrict: 'AE',
		link: linkFn,
		transclude: true,
		scope: {
			width: '@',
			height: '@',
			type: '@',
			data: '=',
			lineColor: '@'
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