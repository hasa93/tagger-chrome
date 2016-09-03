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

			response = response.data[0];
			var voucher = {
				id: response.vouch_id,
				amount: response.vouch_amount,
				branch: response.branch_name,
				expiry: response.exp_date.split('T')[0]
			}

			deferred.resolve({ status: 'SUCCESS', data: voucher });
		}, function(err){
			deferred.reject({ status: "FAILURE", error: err});
		});

		return deferred.promise;
	}

	return o;
});