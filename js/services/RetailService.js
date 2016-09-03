angular.module('TaggerApp')
.factory('RetailService', function($q, $http, config){
	var o = {}
	var baseApiUrl = config.locals.apiUrl;

	o.createVoucher = function(voucher){
		var deferred = $q.defer();

		$http.post(baseApiUrl + 'retail/create/voucher', voucher)
		.then(function(response){
			deferred.resolve({ status: "SUCCESS" });
		}, function(err){
			deferred.reject({ status: "FAILURE", error: err });
		});

		return deferred.promise;
	}

	o.getVoucher = function(voucher_id){
		var deferred = $q.defer();

		$http.get(baseApiUrl + 'retail/find/voucher/' + voucher_id)
		.then(function(response){
			console.log(response);
			deferred.resolve({ status: 'SUCCESS', data: response.data });
		}, function(err){
			deferred.reject({ status: "FAILURE", error: err});
		});

		return deferred.promise;
	}

	return o;
});