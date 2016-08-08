angular.module('TaggerApp')
.directive('modalPopup', function(){
	
	var linkFn = function(scope, elem, attr){
		//Soon to be filled
	}

	return{
		restrict: 'E',
		scope: {
			path: '@',
			cancel: '&'
		},
		link: linkFn,
		template: '<ng-include src="path"></ng-include>'
	}
});