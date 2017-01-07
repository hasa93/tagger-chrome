angular.module('TaggerApp')
.factory('AuthService', function($q, $http, config){
	var o = {};
	var baseApiUrl = config.locals.apiUrl;

	var user = {
		isLoggedIn: false
	};

	o.isLoggedIn = function(){
		return user.isLoggedIn;
	}

	o.logIn = function(loginData){
		var deferred = $q.defer();

		$http.post(baseApiUrl + 'login/staff', loginData)
		.then(function(response){
			//Login failure case
			console.log(response);

			if(response.data.status === 'ERROR'){
				deferred.reject({ status : 'ERROR', msg: response.data.message });
				return;
			}
			else{
				user.token = response.data.token;
				user.profile = response.data.profile;

				config.locals.branchId = user.profile.branchId;
				config.locals.branchName = user.profile.branchName;

				user.isLoggedIn = true;
				//Need a more secure option
				chrome.storage.local.set({ 'token' : user.token });
				deferred.resolve(user);
			}

		}, function(error){
			//API request failure case
			console.log(error);
			deferred.reject({ status: 'ERROR', msg: "Couldn't contact the server" });
		});

		return deferred.promise;
	}

	o.logOut = function(){
		user.logInStatus = false;
		user.role = '';
		config.locals.branchId = -1;
		config.locals.branchName = "";
		chrome.storage.local.remove("token");
	}

	o.getToken = function(){
		if(!user.isLoggedIn){
			return "User logged out"
		}
		return user.token;
	}

	o.reset = function(email){
		var deferred = $q.defer();

		$http.post(baseApiUrl + 'login/forgot', { email: email }).then(function(result){
			console.log(result);
			deferred.resolve({ status: 'SUCCESS', data: result.data });
		}, function(error){
			deferred.reject({ status: 'ERROR', msg: error });
		});

		return deferred.promise;
	}

	return o;
});