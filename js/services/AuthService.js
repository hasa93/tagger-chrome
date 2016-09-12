angular.module('TaggerApp')
.factory('AuthService', function($q, $http){
	var o = {};
	var user = {
		isLoggedIn: false
	};

	o.isLoggedIn = function(){
		return user.isLoggedIn;
	}

	o.logIn = function(loginData){
		var deferred = $q.defer();

		//Just a stupid login dummy should call the db
		$http.post('http://localhost:3000/api/login/staff', loginData)
		.then(function(response){
			//Login failure case
			if(response.status === 'ERROR'){
				deferred.reject({ status : 'ERROR', err: response.message });
				return;
			}
			else{
				user.token = response.data.token;
				user.profile = response.data.profile;
				user.isLoggedIn = true;
				deferred.resolve(user);
			}

		}, function(error){
			//API request failure case
			console.log(error);
			console.log("Login failure: " + error);
		});

		return deferred.promise;
	}

	o.logOut = function(){
		user.logInStatus = false;
		user.role = '';
	}

	o.getToken = function(){
		if(!user.isLoggedIn){
			return "User logged out"
		}
		return user.token;
	}

	return o;
});