angular.module('TaggerApp')
.factory('StatService', function($q, $http, config){
	var o = {};
	var baseApiUrl = config.locals.apiUrl;

	o.getAllSalesStat = function(startDate, endDate){
		var deferred = $q.defer();

		var dateRange = {
			start: startDate,
			end: endDate
		};

		$http.post(baseApiUrl + 'retail/stat/sales/all', {
			start: startDate,
			end: endDate
		}).then(function(response){
			deferred.resolve(response.data);
		}, function(err){
			deferred.reject({ status: 'ERROR', msg: 'Could not load statistics'});
		});

		return deferred.promise;
	}

	o.getSalesById = function(startDate, endDate, prodId){
		var deferred = $q.defer();

		var dateRange = {
			start: startDate,
			end: endDate
		};

		$http.post(baseApiUrl + 'retail/stat/sales/id' + prodId, {
			start: startDate,
			end: endDate,
			prodId: prodId
		}).then(function(response){
			deferred.resolve(response.data);
		}, function(err){
			deferred.reject({ status: 'ERROR', msg: 'Could not load statistics'});
		});

		return deferred.promise;
	}

	return o;
});