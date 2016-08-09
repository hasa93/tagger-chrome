angular.module('TaggerApp')
.factory('VoucherService', function($http){
	var o = {}

	o.getVoucherInfo = function(id, callBack){
		$http.get('http://localhost:3000/api/get/voucher/' + id)
		.then(function(response){
			callBack([response]);
			return;
		}, function(err){
			console.log(err);

			//In an error return dummy data
			callBack([{'voucher_id' : '0001', 'voucher_amount' : '5000', 'voucher_exp': '12/08/16'}]);
		});
	}

	return o;
});