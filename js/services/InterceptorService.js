angular.module('TaggerApp')
.factory('InterceptorService', function($q){
	return{
		request: function(config){
			var deferred = $q.defer();

			chrome.storage.local.get("token", function(token){
				config.headers['token'] = token.token;
				deferred.resolve(config);
			});

			return deferred.promise;
		}
	}
})