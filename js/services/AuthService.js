angular.module('TaggerApp')
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

		return deferred.promise;
	}

	o.logOut = function(){
		user.logInStatus = false;
		user.role = '';
	}

	return o;
});