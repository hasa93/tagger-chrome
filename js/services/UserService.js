angular.module('TaggerApp')
.factory('UserService', function($http, $q, config){
	var o = {};
	var baseApiUrl = config.locals.apiUrl;

	o.createStaffMember = function(staffMember){
		var deferred = $q.defer();

		$http.post(baseApiUrl + 'user/create/staff', staffMember).
		then(function(successRes){
			console.log(successRes);
			deferred.resolve('Staff Created');

		}, function(errorRes){
			console.log(errorRes);
			deferred.reject('Unable to create staff');
		});

		return deferred.promise;
	}

	o.getStaffByName = function(staffName){
		var deferred = $q.defer();

		$http.get(baseApiUrl + 'user/find/staff/' + staffName).then(function(response){
			deferred.resolve(response.data);
		}, function(err){
			console.log(err);
			deferred.resolve(err);
		})

		return deferred.promise;
	}

	o.deleteStaffById = function(staffId){
		var deferred = $q.defer();

		$http.post(baseApiUrl + 'user/delete/staff/' + staffId).then(function(response){
			deferred.resolve({ status : "SUCCESS" });
		}, function(err){
			deferred.reject({ status: "FAILED", error: err });
		});

		return deferred.promise;
	}

	o.updateStaffById = function(staffId, newData){
		var deferred = $q.defer();

		$http.post(baseApiUrl + 'user/update/staff/details/' + staffId, newData).then(function(response){
			deferred.resolve({ status: "SUCCESS" });
		}, function(err){
			deferred.reject({ status: "FAILED", error: err });
		});

		return deferred.promise;
	}

	return o;
});