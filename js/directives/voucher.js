angular.module('TaggerApp')
.directive('voucherForm', function($timeout, $rootScope, RetailService){
	var linkFn = function(scope, elem, attrs){
		console.log("Voucher Started...");

		var now = new Date();
		now.setDate(now.getDate() + 7);

		scope.voucher = {};
		scope.voucher.expiry = now;

		scope.createVoucher = function(){
			console.log("On create voucher...");

			var now = new Date();
			var expiry = new Date(scope.voucher.expiry);

			now = now.getTime();
			expiry = expiry.getTime();

			if(expiry <= now){
				scope.showInvalidExpiry = true;
				$timeout(function(){
					scope.showInvalidExpiry = false;
				}, 4000);
				return;
			}

			$rootScope.isValid = true;
			$rootScope.$broadcast('SUBMIT');

			console.log(scope.voucher);

			if($rootScope.isValid){
				scope.voucher.expiry = scope.voucher.expiry.toJSON().slice(0,10);
				console.log(scope.voucher);

				RetailService.createVoucher(scope.voucher).then(function(response){
					console.log(response);
					scope.newVoucherId = response.voucherId;

					scope.voucher = {};

					var now = new Date();
					now.setDate(now.getDate() + 7);

					scope.voucher.expiry = now;
				}, function(error){
					console.log(error.error);
				});
			}
		}
	}

	return{
		restrict:'E',
		scope: {
			cancel: '&'
		},
		templateUrl: 'templates/directives/createvoucher.html',
		link: linkFn
	}
});