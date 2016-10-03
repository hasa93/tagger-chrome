angular.module('TaggerApp')
.factory('InterceptorService', function(){
	return{
		request: function(config){
			chrome.storage.local.get("token", function(token){
				config.headers['token'] = token.token;
			});
			return config;
		}
	}
})