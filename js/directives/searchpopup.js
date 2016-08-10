angular.module('TaggerApp')
.directive('searchPopup', function(VoucherService){
	
	var linkFn = function(scope, elem, attr){
		
	}

	return{
		restrict: 'E',
		scope: {
			path: '@',
			cancel: '&',
			confirm: '&'
		},
		link: linkFn,
		template: '<ng-include src="path"></ng-include>'
	}
});