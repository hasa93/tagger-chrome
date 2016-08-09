angular.module('TaggerApp')
.directive('modalPopup', function(VoucherService){
	
	var linkFn = function(scope, elem, attr){
		VoucherService.getVoucherInfo(0, function(data){
			scope.vouchers = data;
			console.log(scope.vouchers);
		});
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