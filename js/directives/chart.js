angular.module('TaggerApp')
.directive('chartWindow', function(PosService){
	
	var linkFn = function(scope, elem, attr){
		console.log("Running link on chart...");
	}

	return{
		restrict: 'E',
		link: linkFn,
		transclude: true,
		scope: {
			width: '@',
			height: '@',
			type: '@',
			chartData: '='
		},
		templateUrl: 'templates/barchart.html'
	}
});