angular.module('TaggerApp')
.factory('UserService', function($http, $q, config){
	var o = {};
	var baseApiUrl = config.locals.apiUrl;

	o.createStaffMember = function(staffMember){
		var deferred = $q.defer();

		$http.post(baseApiUrl + 'create/staff', staffMember).
		then(function(successRes){
			console.log(successRes);
			deferred.resolve('Staff Created');

		}, function(errorRes){
			console.log(errorRes);
			deferred.reject('Unable to create staff');
		});

		return deferred.promise;
	}

	return o;
});