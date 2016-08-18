angular.module('TaggerApp')
.factory('RetailService', function($q, $http){
	var o = {}

	o.createVoucher = function(voucher){
		var deferred = $q.defer();

		$http.post('http://localhost:3000/api/retail/create/voucher', voucher)
		.then(function(response){
			deferred.resolve({ status: "SUCCESS" });
		}, function(err){
			deferred.reject({ status: "FAILURE", error: err });
		});

		return deferred.promise;
	}

	return o;
});