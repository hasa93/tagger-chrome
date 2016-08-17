angular.module('TaggerApp')
.factory('UserService', function($http, $q){
	var o = {};

	o.createStaffMember = function(staffMember){
		var deferred = $q.defer();

		$http.post('http://localhost:3000/retail/api/create/staff', staffMember).
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