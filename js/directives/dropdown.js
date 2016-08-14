angular.module('TaggerApp')
.directive('dropDown', function(){
	var linkFn = function(scope, elem, attrs){
		var chooseItem = function(item){
			console.log(item);
		}
	}

	return{
		restrict: 'E',
		link: linkFn,
		scope:{
			list: '=',
			visible: '=',
			placeHolder: '@'
		},
		templateUrl: 'templates/dropdown.html'
	}
});