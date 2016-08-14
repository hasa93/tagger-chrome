angular.module('TaggerApp')
<<<<<<< 3c735a18691e013c0b3484cd9e65736d4b77b445
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
				deferred.reject(response.message);
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
=======
.factory('AuthService', function($q){
	var o = {};
	var user = {
		logInStatus: false,
		role: ''
	};

	o.isLoggedIn = function(){
		return user.logInStatus;
	}

	o.logIn = function(uname, passwd){
		var deferred = $q.defer();

		//Just a stupid login dummy should call the db
		if(uname === 'admin' && passwd === 'admin'){
			user.role = 'admin';
			user.logInStatus = true;
			deferred.resolve(user);
		}
		else{
			deferred.reject('Ouch! login failure');
		}
>>>>>>> Implement user authentication service

		return deferred.promise;
	}

	o.isLoggedIn = function(){
		return user.logInStatus;
	}

	o.logOut = function(){
		user.logInStatus = false;
		user.role = '';
	}

<<<<<<< 3c735a18691e013c0b3484cd9e65736d4b77b445
	o.getToken = function(){
		if(!user.isLoggedIn){
			return "User logged out"
		}
		return user.token;
	}

=======
>>>>>>> Implement user authentication service
	return o;
});